import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: "/v1",
      trackingApi: "/v1",
      recommendationApi: "/v1"
    },
    BGO: {
      BgoOfficialAccountId: "",
      token: "",
      secret: "",
      clientId: "",
      widgetId: ""
    },
    RECOMMENDATION_ENABLED: {
      news: true,
      product: true,
      styled: true
    },
    TRACKING_EVENT: {
      trackingVer: "",
      gaId: ""
    },
    BUILD: {
      builtAt: new Date().toLocaleString()
    },
    SUPPLIER: {
      enabled: true,
      detailUrls: [
        "articles/tw/1/1367265362118184960/detail.html",
        "articles/tw/1/1367271967903715328/detail.html",
        "articles/tw/1/1367271974606213120/detail.html",
        "articles/tw/1/1367281863013437440/detail.html",
        "articles/tw/1/1367286009997299712/detail.html",
        "articles/tw/1/1367295918428131328/detail.html",
        "articles/tw/1/1367302549698252800/detail.html",
        "articles/tw/1/1367302560016240640/detail.html",
        "articles/tw/1/1367302568392265728/detail.html",
        "articles/tw/1/1367305398184316928/detail.html"
      ],
      openId: ""
    },
    VIDEO_IMAGE: {
      size: ["default", "medium", "high", "standard", "maxres"][3]
    },
    NO_ALLOW_COUNTRY_AREA: "HK",
    AD: {
      AdOfficialAccountId: ""
    },
    APP_DEBUG_MODE: true,
    TRACKER_DEBUG_MODE: true
  }
});
