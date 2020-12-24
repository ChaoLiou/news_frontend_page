import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: process.env.BACKEND_API || "https://753f40f86863.ngrok.io/v1",
      trackingApi:
        process.env.TRACKING_API || "https://fb1b2bcc52bd.ngrok.io/v1",
      recommendationApi:
        process.env.RECOMMENDATION_API || "https://stg-news-api.beanfun.com/v1"
    },
    RECOMMENDATION_ENABLED: {
      news: process.env.RECOMMENDATION_ENABLED_NEWS !== false,
      product: process.env.RECOMMENDATION_ENABLED_PRODUCT !== false
    },
    TRACKING_EVENT: {
      trackingVer: process.env.TRACKING_VER || "0.07"
    },
    BUILD: {
      builtAt: new Date().toLocaleString()
    },
    SUPPLIER: {
      enabled: false,
      detailUrls: [],
      openId: ""
    },
    VIDEO_IMAGE: {
      size: ["default", "medium", "high", "standard", "maxres"][3]
    },
    AD: {
      officialAccountId: "690c8cba53934c138e997f7685e98412_oa"
    },
    APP_DEBUG_MODE: true,
    TRACKER_DEBUG_MODE: true
  }
});
