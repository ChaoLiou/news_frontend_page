let config = {};
if (DEVELOPMENT) {
  config = require("../nuxt.config.dev.js").default;
} else {
  config = require("../nuxt.config.js").default;
}
import { get, post } from "../assets/js/fetchAPI";
import { hideVConsole, getVendorStageDetailUrl } from "../assets/js/utils";
import {
  includeScriptSources,
  parseNewsIdWithinUrl,
  parseQueryString
} from "./utils";
import { formatNews } from "../assets/js/formatter";
import {
  renderToolMenu,
  renderSourceTitle,
  renderDateTimeInfo,
  renderRecommendNewsTitle,
  renderRecommendAdTitle,
  renderSoureNewsLink,
  toggleToolMenuItemForLoading
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
  openFullH5Webview,
  redirectUriByDefaultBrowser
} from "../assets/js/beanfun";
import { getOSType, getTimeZone } from "../assets/js/tracking/utils";
import { planet_click_news } from "../assets/js/tracking/events";
import { state as initBeanfunState } from "../store/stateRepo/beanfun";
import { state as initEventState } from "../store/stateRepo/event";
let _beanfunState = initBeanfunState();
let _eventState = initEventState();
const _newsId = parseNewsIdWithinUrl();
const _queryStringMap = parseQueryString();
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
  ...config.head.script.filter(x => !!x.group),
  { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js", group: "beanfun_vue" },
  {
    src: "/packages/b-recommend-news-block/index.umd.min.js",
    group: "beanfun_vue"
  },
  {
    src: "/packages/b-recommend-ad-block/index.umd.min.js",
    group: "beanfun_vue"
  }
];
includeScriptSources(scripts);

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
  init();
  const { officialAccountId, token, clientId } = _serverEnv;
  checkAppExist(() => {
    initBGO(officialAccountId, token);
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
    getOpenidAccessToken(clientId, "", accessTokenResult => {
      _beanfunState = {
        ..._beanfunState,
        accessToken: accessTokenResult
      };
      get(
        `openid/token/verification?token=${accessTokenResult.access_token}`,
        BASE_URL.backendApi
      ).then(verification => {
        console.log({ verification });
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
    Array.isArray(json.data) && json.data.length > 0
      ? initWithNews(formatNews(json.data[0]))
      : console.error(
          `news(${_newsId}) is not found on [${BASE_URL.backendApi}]!`
        )
  );
}

function initWithNews(news) {
  renderSourceTitle(news.source);
  renderDateTimeInfo(news.publishTimeUnix, news.updateTimeUnix);
  renderRecommendNewsTitle("你可能會喜歡");
  // renderRecommendAdTitle("不能錯過");
  renderSoureNewsLink("檢視原始文章", news.externalLink);
  bindEvents(news);
  initRecommendAdBlock(news);
}

function initRecommendAdBlock(news) {
  new Vue({
    el: ".ads",
    template:
      `<b-recommend-ad-block ` +
      `recommendation-api-prefix="${BASE_URL.recommendationApi}" ` +
      `news-title="${news.title}" />`,
    components: {
      "b-recommend-ad-block": BRecommendAdBlock
    }
  });
}

function initRecommendNewsBlock() {
  const { language, country } = _beanfunState.profile;
  new Vue({
    el: ".masonry-scroll",
    template:
      `<b-recommend-news-block ` +
      `api-prefix="${BASE_URL.backendApi}" ` +
      `recommendation-api-prefix="${BASE_URL.recommendationApi}" ` +
      `news-id="${_newsId}" ` +
      `planet-id="${_queryStringMap.planetId}" ` +
      `lang="${language}" ` +
      `country="${country}" ` +
      `@navigate="navigate" />`,
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
        let link = `${data.link}?session_id=${session_id}&action_index=${action_index}`;
        link = VENDOR_STAGE.enabled
          ? `${location.origin}/${getVendorStageDetailUrl(
              location.pathname,
              VENDOR_STAGE.detailUrls
            )}`
          : link;
        link += `?planetId=${data.representativePlanet.id}`;
        checkAppExist(
          () => {
            openFullH5Webview(
              link,
              data.representativePlanet.name,
              _serverEnv.officialAccountId
            );
          },
          () => {
            window.open(link, "_blank");
          }
        );
      }
    }
  });
}

function trackEvent({ session_id, action_index, event_id, payload }) {
  const open_id = _beanfunState.verification.open_id;
  if (open_id) {
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
  } else {
    console.log(
      `open_id is not found in verification: ${JSON.stringify(
        _beanfunState.verification
      )}`
    );
  }
}

function bindEvents(news) {
  document
    .querySelectorAll(".detail__content a.link__open-by-default-browser")
    .forEach(aDOM => {
      const url = aDOM.href;
      aDOM.href = "#";
      aDOM.addEventListener("click", () => {
        redirectUriByDefaultBrowser(url);
      });
    });

  const titleDOM = document.querySelector(".title");
  titleDOM.addEventListener("click", () => {
    const vConsoleDOM = document.querySelector("#__vconsole");
    vConsoleDOM.classList.remove("hidden");
  });

  const insideSharingDOM = document.querySelector(".tool-menu__inside-sharing");
  const outsideSharingDOM = document.querySelector(
    ".tool-menu__outside-sharing"
  );
  const link = news.link;
  const encodedLink = encodeURIComponent(link);
  const image = news.img;
  const description = news.description;
  const title = news.representativePlanet.name;
  const { widgetId, officialAccountId } = _serverEnv;
  const deepLinkOutsideSharing = `beanfunapp://Q/h5page/${officialAccountId}?url=${encodedLink}&theme=1&title=${title}`;
  console.log({ widgetId, officialAccountId });
  insideSharingDOM.addEventListener("click", () => {
    const { msg_body, select_opt } = generateInsideSharingParams({
      description,
      widgetId,
      image,
      link,
      title: "前往星球"
    });
    sendMessageV2(msg_body, select_opt);
  });

  outsideSharingDOM.addEventListener("click", () => {
    toggleToolMenuItemForLoading(".tool-menu__outside-sharing");
    generateOutsideSharingParamsPromise({
      title,
      description,
      image,
      deepLink: deepLinkOutsideSharing,
      api: BASE_URL.backendApi
    }).then(json => {
      toggleToolMenuItemForLoading(".tool-menu__outside-sharing");
      if (json._id) {
        sendDataToApps(json._id);
      } else {
        console.error(`_id is not found!`);
      }
    });
  });
}
