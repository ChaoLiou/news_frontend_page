import config from "../nuxt.config.js";
import { get, post } from "../assets/js/fetchAPI";
import { hideVConsole, getVendorStageDetailUrl } from "../assets/js/utils";
import { includeScriptSources, parseNewsIdWithinUrl } from "./utils";
import {
  renderToolMenu,
  renderSourceTitle,
  renderDateTimeInfo,
  renderRecommendNewsTitle,
  renderSoureNewsLink
} from "./render";
import {
  generateInsideSharingParams,
  generateOutsideSharingParamsPromise
} from "./sharing";
import {
  sendMessageV2,
  sendDataToApps,
  initBGO,
  getOpenidAccessToken,
  checkAppExist,
  getMeProfile,
  openFullH5Webview
} from "../assets/js/beanfun";
import { getOSType, getTimeZone } from "../assets/js/tracking/utils";
import { planet_click_news } from "../assets/js/tracking/events";
import { state as initBeanfunState } from "../store/stateRepo/beanfun";
import { state as initEventState } from "../store/stateRepo/event";
let _beanfunState = initBeanfunState();
let _eventState = initEventState();
const _newsId = parseNewsIdWithinUrl();
const { BASE_URL = {}, TRACKING_EVENT = {}, VENDOR_STAGE = {} } = config.env;
let _serverEnv = {
  officialAccountId: "",
  token: "",
  secret: "",
  clientId: "",
  widgetId: ""
};

window.vconsoleOnload = vconsoleOnload;
window.beanfun_vueOnload = beanfun_vueOnload;

const scripts = [
  ...config.head.script,
  { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js", group: "beanfun_vue" },
  { src: "/packages/b-recommend-news-block.umd.min.js", group: "beanfun_vue" }
];
includeScriptSources(scripts);
init();

function beanfun_vueOnload() {
  get("variable", BASE_URL.backendApi)
    .then(
      json =>
        (_serverEnv = {
          officialAccountId: json.OfficialAccountID,
          token: json.Token,
          secret: json.Secret,
          clientId: json.ClientID,
          widgetId: json.WidgetID
        })
    )
    .then(serverEnvReady)
    .then(initRecommendNewsBlock);
}

function vconsoleOnload() {
  new VConsole();
  hideVConsole();
}

function serverEnvReady() {
  const { officialAccountId, token, clientId } = _serverEnv;
  checkAppExist(() => {
    getMeProfile(profile => {
      _beanfunState = {
        ..._beanfunState,
        profile: {
          ...profile,
          language: profile.language.includes("_") ? profile.language : "zh_TW"
        }
      };
      const { language, country } = profile;
      _eventState = {
        ..._eventState,
        info: {
          ..._eventState.info,
          lang: language,
          region: country
        }
      };
    });
    initBGO(officialAccountId, token);
    getOpenidAccessToken(clientId, "", accessTokenResult => {
      _beanfunState = {
        ..._beanfunState,
        accessToken: accessTokenResult
      };
      get(
        `openid/token/verification?token=${accessTokenResult.access_token}`,
        BASE_URL.beanfunApi
      ).then(verification => {
        _beanfunState = {
          ..._beanfunState,
          verification
        };
      });
    });
  });
}

function init() {
  _eventState = {
    ..._eventState,
    env: {
      ..._eventState.env,
      app_ver: TRACKING_EVENT.appVer,
      app_build: TRACKING_EVENT.appBuild,
      t_ver: TRACKING_EVENT.trackingVer
    },
    info: {
      ..._eventState.info,
      os_type: getOSType(),
      tz: getTimeZone()
    }
  };

  renderToolMenu("轉傳", "分享");

  get(`news?id=${_newsId}`, BASE_URL.backendApi).then(json =>
    typeof json.data === typeof [] && json.data.length > 0
      ? initWithNews(json.data[0])
      : console.error(
          `news(${_newsId}) is not found on [${BASE_URL.backendApi}]!`
        )
  );
}

function initWithNews(news) {
  renderSourceTitle(news.src_site.description);
  renderDateTimeInfo(news.src_publish_time_unix, news.src_update_time_unix);
  renderRecommendNewsTitle("你可能會喜歡");
  renderSoureNewsLink("檢視原始文章", news.src_url);
  bindEvents(news);
}

function initRecommendNewsBlock() {
  const { language, country } = _beanfunState.profile;
  new Vue({
    el: ".masonry-scroll",
    template: `<b-recommend-news-block api-prefix="${BASE_URL.backendApi}" news-id="${_newsId}" @navigate="navigate" lang="${language}" country="${country}" />`,
    components: {
      "b-recommend-news-block": BRecommendNewsBlock
    },
    methods: {
      navigate({ data, session_id, action_index }) {
        trackEvent({
          session_id,
          action_index,
          event_id: planet_click_news.id,
          payload: planet_click_news.generatePayload({
            planet_name: data.representativePlanet.name,
            category: data.categories.map(x => x.name),
            url: data.link,
            title: data.title,
            news_id: data.id
          })
        });
        const link = `${data.link}?session_id=${session_id}&action_index=${action_index}`;
        openFullH5Webview(
          VENDOR_STAGE.enabled
            ? `${location.origin}/${getVendorStageDetailUrl(
                location.pathname,
                VENDOR_STAGE.detailUrls
              )}`
            : link,
          data.representativePlanet.name,
          _serverEnv.officialAccountId
        );
      }
    }
  });
}

function trackEvent({ session_id, action_index, event_id, payload }) {
  const open_id = _beanfunState.verification.open_id;
  _eventState = {
    ..._eventState,
    data: {
      ..._eventState.data,
      dtm: Date.now().toString(),
      event_id,
      payload,
      openid: open_id,
      session_id,
      action_index
    }
  };
  console.log({ env: _eventState.env });
  console.log({ info: _eventState.info });
  console.log({ data: _eventState.data });
  const body = {
    ..._eventState.env,
    ..._eventState.info,
    ..._eventState.data
  };
  post("tracking", body, BASE_URL.trackingApi).then(result =>
    console.log({ result })
  );
}

function bindEvents(news) {
  const titleDOM = document.querySelector(".title");
  titleDOM.addEventListener("click", () => {
    const vConsoleDOM = document.querySelector("#__vconsole");
    vConsoleDOM.classList.remove("hidden");
  });

  const insideSharingDOM = document.querySelector(".tool-menu__inside-sharing");
  const outsideSharingDOM = document.querySelector(
    ".tool-menu__outside-sharing"
  );
  const link = news.article_path;
  const encodedLink = encodeURIComponent(link);
  const image = news.Images[0].file_path;
  const description = news.description;
  const title = news.src_title;
  const { widgetId, officialAccountId } = _serverEnv;
  const deepLinkInsideSharing = `beanfunapp://Q/h5/w_id/${widgetId}?url=${encodedLink}`;
  const deepLinkOutsideSharing = `beanfunapp://Q/h5page/${officialAccountId}?url=${encodedLink}&theme=1&title=${title}`;

  insideSharingDOM.addEventListener("click", () => {
    const { msg_body, select_opt } = generateInsideSharingParams({
      description,
      widgetId,
      image,
      deepLinkInsideSharing,
      title
    });
    sendMessageV2(msg_body, select_opt);
  });

  outsideSharingDOM.addEventListener("click", () => {
    generateOutsideSharingParamsPromise({
      title,
      description,
      image,
      deepLinkOutsideSharing,
      api: BASE_URL.backendApi
    }).then(json => {
      if (json._id) {
        sendDataToApps(json._id);
      } else {
        console.error(`_id is not found!`);
      }
    });
  });
}
