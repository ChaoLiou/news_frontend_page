import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: "https://576ef25991bf.ngrok.io/v1",
      trackingApi: "https://f725075ecf24.ngrok.io/v1",
      recommendationApi: "https://stg-news-api.beanfun.com/v1"
    },
    RECOMMENDATION_ENABLED: {
      news: true,
      product: true,
      style: true
    },
    TRACKING_EVENT: {
      trackingVer: "0.07"
    },
    BUILD: {
      builtAt: new Date().toLocaleString()
    },
    SUPPLIER: {
      enabled: true,
      detailUrls: [
        "articles/tw/1/1342491504970567680/detail.html",
        "articles/tw/1/1342375722760540160/detail.html"
      ],
      openId: "1010004000027002425"
    },
    VIDEO_IMAGE: {
      size: ["default", "medium", "high", "standard", "maxres"][3]
    },
    NO_ALLOW_COUNTRY_AREA: "HK",
    AD: {
      officialAccountId: "690c8cba53934c138e997f7685e98412_oa"
    },
    APP_DEBUG_MODE: true,
    TRACKER_DEBUG_MODE: true
  }
});
