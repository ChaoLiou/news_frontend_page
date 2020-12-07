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
    RECOMMENDATION_ENABLED: process.env.RECOMMENDATION_ENABLED !== false,
    TRACKING_EVENT: {
      appVer: process.env.APP_VER || "1.0.0",
      appBuild: process.env.APP_BUILD || 1,
      trackingVer: process.env.TRACKING_VER || "0.07"
    },
    BUILD: {
      builtAt: new Date().toLocaleString()
    },
    VENDOR_STAGE: {
      enabled: false,
      detailUrls: []
    },
    VIDEO_IMAGE: {
      size: ["default", "medium", "high", "standard", "maxres"][1]
    },
    DEBUG_MODE: false
  }
});
