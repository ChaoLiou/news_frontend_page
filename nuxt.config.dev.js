import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: "https://3c79b7629bc3.ngrok.io/v1",
      trackingApi: "https://fe5977f3081d.ngrok.io/v1",
      recommendationApi: "https://stg-news-api.beanfun.com/v1"
    },
    RECOMMENDATION_ENABLED: {
      news: true,
      product: true,
      styled: true
    },
    TRACKING_EVENT: {
      trackingVer: "0.07",
      gaId: "G-Y5781NKN6D"
    },
    BUILD: {
      builtAt: new Date().toLocaleString()
    },
    SUPPLIER: {
      enabled: true,
      detailUrls: [
        "articles/tw/1/1342491504970567680/detail.html",
        "articles/tw/1/1342375722760540160/detail.html",
        "articles/tw/41/1348948166656921600/detail.html",
        "articles/tw/1/1350974027929227264/detail.html"
      ],
      openId: ""
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
