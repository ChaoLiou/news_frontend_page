let config = {};
if (DEVELOPMENT) {
  config = require("../nuxt.config.dev.js").default;
} else {
  config = require("../nuxt.config.js").default;
}
import { get } from "../assets/js/fetchAPI";
import {
  hideVConsole,
  getSupplierDetailUrl,
  showVConsole
} from "../assets/js/utils";
import {
  includeScriptSources,
  parseNewsIdWithinUrl,
  parseQueryString
} from "./utils";
import { formatNews } from "../assets/js/formatter";
import {
  renderToolMenu,
  renderSource,
  renderDateTimeInfo,
  renderRecommendNewsTitle,
  renderSoureNewsLink,
  toggleToolMenuItemForLoading,
  createElement
} from "./render";
import {
  generateInsideSharingParams,
  generateOutsideSharingParamsPromise
} from "./sharing";
import {} from "../assets/js/beango";
import {
  initBGO,
  checkAppExistAsync,
  openFullH5WebviewAsync,
  getOpenidAccessTokenAsync,
  getMeProfileAsync,
  sendMessageV2,
  sendDataToApps,
  redirectUriByDefaultBrowser
} from "../assets/js/beango/index.async";
import { trackEvent } from "../assets/js/tracking";
import { initTracker } from "./init-tracker";
import { getOSType, getTimeZone } from "../assets/js/tracking/utils";
import { click_news, view_news_page } from "../assets/js/tracking/events";
import { state as initBeanfunState } from "../store/stateRepo/beanfun";
import { state as initEventState } from "../store/stateRepo/event";
let _beanfunState = initBeanfunState();
let _eventState = initEventState();
const _newsId = parseNewsIdWithinUrl();
const _queryStringMap = parseQueryString();
const {
  BASE_URL = {},
  TRACKING_EVENT = {},
  SUPPLIER = {},
  RECOMMENDATION_ENABLED = { news: true, product: true },
  AD = {}
} = config.env;
let _serverEnv = {
  officialAccountId: "",
  token: "",
  secret: "",
  clientId: "",
  widgetId: ""
};

const longTouch = {
  interval: 0,
  duration: 2,
  counter: 0
};

function stopDetectingLongTouch() {
  const titleDOM = document.querySelector(".title");
  titleDOM.querySelector("span").innerText = "";
  clearInterval(longTouch.interval);
  longTouch.interval = 0;
  longTouch.counter = 0;
}

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

async function serverEnvReady() {
  init();
  const { officialAccountId, token, clientId } = _serverEnv;
  if (await checkAppExistAsync()) {
    initBGO(officialAccountId, token);
    const profile = await getMeProfileAsync();
    if (profile) {
      console.log({ profile });
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
    }
    const accessTokenResult = await getOpenidAccessTokenAsync(clientId, "");
    if (accessTokenResult) {
      console.log({ accessTokenResult });
      const apiRelative = `openid/token/verification?token=${accessTokenResult.access_token}`;
      const verification = await get(apiRelative, BASE_URL.backendApi);
      if (verification) {
        console.log({ verification });
        _beanfunState = {
          ..._beanfunState,
          verification
        };
        const { open_id = SUPPLIER.openId } = verification;
        await initTracker({
          openId: open_id,
          tVer: TRACKING_EVENT.trackingVer,
          beanfunTrackerServerUrl: `${BASE_URL.trackingApi}/tracking`,
          oaid: officialAccountId,
          officialAccountAccessToken: token
        });
      }
    }
  }
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
  renderSource(news.source);
  renderDateTimeInfo(news.publishTimeUnix, news.updateTimeUnix);
  renderRecommendNewsTitle("你可能會喜歡");
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
      `:recommendation-enabled="${RECOMMENDATION_ENABLED.product}" ` +
      `keyword="${news.title}" ` +
      `:title-text="titleText" ` +
      `@navigate="navigate" />`,
    components: {
      "b-recommend-ad-block": BRecommendAdBlock
    },
    data() {
      return {
        titleText: "購物推薦"
      };
    },
    methods: {
      async navigate(data) {
        console.log({ data });
        if (await checkAppExistAsync()) {
          await openFullH5WebviewAsync(data.link, "", AD.officialAccountId);
        } else {
          window.open(data.link, "_blank");
        }
      }
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
      `:recommendation-enabled="${RECOMMENDATION_ENABLED.news}" ` +
      `news-id="${_newsId}" ` +
      `planet-id="${_queryStringMap.planetId}" ` +
      `lang="${language}" ` +
      `country="${country}" ` +
      `@navigate="navigate" />`,
    components: {
      "b-recommend-news-block": BRecommendNewsBlock
    },
    methods: {
      async navigate(data) {
        await trackEvent(
          click_news.id,
          click_news.category,
          click_news.action,
          click_news.formatPayload({
            planetName: data.representativePlanet.name,
            categoryName: data.categories.map(x => x.name),
            detailPageLink: data.link,
            newsTitle: data.title,
            newsId: data.id,
            newsIndex: data.index
          })
        );
        let link = data.link;
        link = SUPPLIER.enabled
          ? `${location.origin}/${getSupplierDetailUrl(
              location.pathname,
              SUPPLIER.detailUrls
            )}`
          : link;
        link += `?planetId=${data.representativePlanet.id}`;
        if (await checkAppExistAsync()) {
          await openFullH5WebviewAsync(
            link,
            data.representativePlanet.name,
            _serverEnv.officialAccountId
          );
        } else {
          window.open(link, "_blank");
        }
      }
    }
  });
}

function bindScroll(news) {
  const stages = [
    {
      rate: 25,
      done: false
    },
    {
      rate: 50,
      done: false
    },
    {
      rate: 75,
      done: false
    },
    {
      rate: 100,
      done: false
    }
  ];
  const headerDOM = document.querySelector(".header");
  const detailDOM = document.querySelector(".detail");
  const scrollableDistance =
    headerDOM.offsetHeight + detailDOM.offsetHeight - window.screen.height;
  const startScrollingX = 0;
  window.addEventListener("scroll", event => {
    const scrolledDistance = pageYOffset - startScrollingX;
    const scrolledDistanceRate = (scrolledDistance * 100) / scrollableDistance;
    const undoneStages = stages.filter(x => !x.done);
    if (undoneStages.length > 0) {
      const stage = undoneStages[0];
      if (scrolledDistanceRate > stage.rate) {
        stage.done = true;
        Promise.resolve(
          trackEvent(
            view_news_page.id,
            view_news_page.category,
            view_news_page.action,
            view_news_page.formatPayload(news.id, stage.rate)
          )
        );
      }
    }
  });
}

function bindEvents(news) {
  bindScroll(news);

  document
    .querySelectorAll(".detail__content a.link__open-by-default-browser")
    .forEach(aDOM => {
      const url = aDOM.href;
      aDOM.href = "javascript:;";
      aDOM.addEventListener("click", () => {
        redirectUriByDefaultBrowser(url);
      });
    });

  const titleDOM = document.querySelector(".title");
  titleDOM.append(createElement("span"));
  titleDOM.addEventListener("touchstart", () => {
    longTouch.interval = setInterval(() => {
      if (longTouch.counter >= longTouch.duration) {
        showVConsole();
        stopDetectingLongTouch();
      } else {
        longTouch.counter++;
        titleDOM.querySelector("span").innerText = `${longTouch.duration -
          longTouch.counter +
          1}`;
      }
    }, 1000);
  });

  titleDOM.addEventListener("touchend", stopDetectingLongTouch);
  titleDOM.addEventListener("touchcancel", stopDetectingLongTouch);

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
