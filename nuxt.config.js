import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: process.env.BACKEND_API || "https://576ef25991bf.ngrok.io/v1",
      trackingApi:
        process.env.TRACKING_API || "https://f725075ecf24.ngrok.io/v1",
      recommendationApi:
        process.env.RECOMMENDATION_API || "https://stg-news-api.beanfun.com/v1"
    },
    RECOMMENDATION_ENABLED: {
      news: process.env.RECOMMENDATION_ENABLED_NEWS !== false,
      product: process.env.RECOMMENDATION_ENABLED_PRODUCT !== false,
      styled: process.env.RECOMMENDATION_ENABLED_STYLED !== false
    },
    TRACKING_EVENT: {
      trackingVer: process.env.TRACKING_VER || "0.07"
    },
    NO_ALLOW_COUNTRY_AREA: process.env.NO_ALLOW_COUNTRY_AREA || "HK",
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
