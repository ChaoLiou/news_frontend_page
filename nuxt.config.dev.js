import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: "https://753f40f86863.ngrok.io/v1",
      trackingApi: "https://fb1b2bcc52bd.ngrok.io/v1",
      recommendationApi: "https://stg-news-api.beanfun.com/v1"
    },
    RECOMMENDATION_ENABLED: true,
    TRACKING_EVENT: {
      appVer: "1.0.0",
      appBuild: 1,
      trackingVer: "0.07"
    },
    BUILD: {
      builtAt: new Date().toLocaleString()
    },
    VENDOR_STAGE: {
      enabled: true,
      detailUrls: [
        "articles/tw/1/1329628436708200448/detail.html",
        "articles/tw/1/1333315799703621632/detail.html",
        "articles/tw/1/1329628439400943616/detail.html"
      ]
    },
    VIDEO_IMAGE: {
      size: ["default", "medium", "high", "standard", "maxres"][1]
    },
    DEBUG_MODE: true
  }
});
