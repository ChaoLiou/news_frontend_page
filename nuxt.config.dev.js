import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: "https://stg-news-api.beanfun.com/v1",
      trackingApi: "https://stg-news-api.beanfun.com/v1",
      recommendationApi: "https://stg-news-api.beanfun.com/v1"
    },
    RECOMMENDATION_ENABLED: {
      news: true,
      product: true
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
        "articles/tw/1/1329628436708200448/detail.html",
        "articles/tw/1/1333315799703621632/detail.html",
        "articles/tw/1/1329628439400943616/detail.html"
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
