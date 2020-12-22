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
      appVer: process.env.APP_VER || "1.0.0",
      appBuild: process.env.APP_BUILD || 1,
      trackingVer: process.env.TRACKING_VER || "0.07"
    },
    BUILD: {
      builtAt: new Date().toLocaleString(),
      version: process.env.BUILD_VERSION || "abcdefghijklmnopqrstuvwxyz"
    },
    VENDOR_STAGE: {
      enabled: false,
      detailUrls: [],
      openId: ""
    },
    VIDEO_IMAGE: {
      size: ["default", "medium", "high", "standard", "maxres"][3]
    },
    AD: {
      officialAccountId:
        process.env.AD_OFFICIAL_ACCOUNT_ID ||
        "690c8cba53934c138e997f7685e98412_oa"
    },
    DEBUG_MODE: false
  }
});
