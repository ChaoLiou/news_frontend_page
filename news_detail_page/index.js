import config from "../nuxt.config.js";
import { get } from "../assets/js/fetchAPI";
import { hideVConsole } from "../assets/js/utils";
import { includeScriptSources, parseNewsIdWithinUrl } from "./utils";
import {
  renderToolMenu,
  renderSourceTitle,
  renderDateTimeInfo,
  renderRecommendNewsTitle
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
  getMeLocation
} from "../assets/js/beanfun";
import { getOSType, getTimeZone } from "../assets/js/tracking/utils";
import { getPlanetName } from "../assets/js/tracking/mapping";
import { planet_click_news } from "../assets/js/tracking/events";
import { state as initBeanfunState } from "../store/stateRepo/beanfun";
import { state as initEventState } from "../store/stateRepo/event";
let _beanfunState = initBeanfunState();
let _eventState = initEventState();
const _newsId = parseNewsIdWithinUrl();
const _env = config.env;
const _newsAPI = _env.BASE_URL.backendApi;
let _serverEnv = {
  officialAccountId: "",
  token: "",
  secret: "",
  clientId: "",
  widgetId: ""
};
const testingEnabled = _env.VENDOR_STAGE.enabled;

window.beanfunOnload = beanfunOnLoad;
window.vconsoleOnload = vconsoleOnload;
window.vueOnload = vueOnload;

const scripts = [
  ...config.head.script,
  { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js", name: "vue" },
  { src: "/packages/b-recommend-news-block.umd.min.js", name: "vue" }
];
includeScriptSources(scripts);
init();

function beanfunOnLoad() {
  get("variable", _newsAPI)
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
    .then(serverEnvReady);
}

function vconsoleOnload() {
  new VConsole();
  hideVConsole();
}

function vueOnload() {
  initRecommendNewsBlock();
}

function serverEnvReady() {
  const { officialAccountId, token, clientId } = _serverEnv;
  checkAppExist(() => {
    // getMeProfile(profile => {
    //   _beanfunState = {
    //     ..._beanfunState,
    //     profile
    //   };
    //   const { language, country } = profile;
    //   _eventState = {
    //     ..._eventState,
    //     info: {
    //       ..._eventState.info,
    //       lang: language,
    //       region: country
    //     }
    //   };
    // });
    getMeLocation(location => {
      _beanfunState = {
        ..._beanfunState,
        location
      };
      const { longitude, latitude } = location;
      _eventState = {
        ..._eventState,
        info: {
          ..._eventState.info,
          longitude,
          latitude
        }
      };
    });
    initBGO(officialAccountId, token);
    // getOpenidAccessToken(clientId, "", accessTokenResult => {
    //   _beanfunState = {
    //     ..._beanfunState,
    //     accessToken: accessTokenResult
    //   };
    //   get(
    //     `openid/token/verification?token=${accessTokenResult.access_token}`,
    //     _env.BASE_URL.beanfunApi
    //   ).then(verification => {
    //     _beanfunState = {
    //       ..._beanfunState,
    //       verification
    //     };
    //   });
    // });
  });
}

function init() {
  _eventState = {
    ..._eventState,
    env: {
      ..._eventState.env,
      app_ver: _env.TRACKING_EVENT.appVer,
      app_build: _env.TRACKING_EVENT.appBuild,
      t_ver: _env.TRACKING_EVENT.trackingVer
    },
    info: {
      ..._eventState.info,
      os_type: getOSType(),
      tz: getTimeZone()
    }
  };

  renderToolMenu();

  get(`news?id=${_newsId}`, _newsAPI).then(json =>
    typeof json.data === typeof [] && json.data.length > 0
      ? initWithNews(json.data[0])
      : console.error(`news(${_newsId}) is not found on [${_newsAPI}]!`)
  );
}

function initWithNews(news) {
  renderSourceTitle(news.src_site.description);
  renderDateTimeInfo(news.src_publish_time_unix, news.src_update_time_unix);
  renderRecommendNewsTitle("你可能會喜歡");
  bindEvents(news);
}

function initRecommendNewsBlock() {
  new Vue({
    el: ".masonry-scroll",
    template: `<b-recommend-news-block api-prefix="${_newsAPI}" news-id="${_newsId}" @navigate="navigate" :testing="${testingEnabled}" official-account-id="${_serverEnv.officialAccountId}" />`,
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
            planet_name:
              data.categories.length > 0
                ? getPlanetName(data.categories[0].NewsMainBanner.id)
                : "",
            category: data.categories,
            url: data.link,
            title: data.title,
            news_id: data.id
          })
        });
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
  const widgetId = _serverEnv.widgetId;
  const deepLink = `beanfunapp://Q/h5/w_id/${widgetId}?url=${encodedLink}`;
  const image = news.Images[0].file_path;
  const description = news.description;
  const title = news.src_title;

  insideSharingDOM.addEventListener("click", () => {
    const { msg_body, select_opt } = generateInsideSharingParams({
      description,
      widgetId,
      image,
      deepLink,
      title
    });
    sendMessageV2(msg_body, select_opt);
  });

  outsideSharingDOM.addEventListener("click", () => {
    generateOutsideSharingParamsPromise({
      title,
      description,
      image,
      deepLink,
      api: _newsAPI
    }).then(json => {
      if (json._id) {
        sendDataToApps(json._id);
      } else {
        console.error(`_id is not found!`);
      }
    });
  });
}
