import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: process.env.BACKEND_API || "https://3c79b7629bc3.ngrok.io/v1",
      trackingApi:
        process.env.TRACKING_API || "https://fe5977f3081d.ngrok.io/v1",
      recommendationApi:
        process.env.RECOMMENDATION_API || "https://stg-news-api.beanfun.com/v1"
    },
    BGO: {
      BgoOfficialAccountId: process.env.BGO_OFFICIAL_ACCOUNT_ID || "",
      token: process.env.BGO_TOKEN || "",
      secret: process.env.BGO_SECRET || "",
      clientId: process.env.BGO_CLIENT_ID || "",
      widgetId: process.env.BGO_WIDGET_ID || ""
    },
    RECOMMENDATION_ENABLED: {
      news: process.env.RECOMMENDATION_ENABLED_NEWS !== false,
      product: process.env.RECOMMENDATION_ENABLED_PRODUCT !== false,
      styled: process.env.RECOMMENDATION_ENABLED_STYLED !== false
    },
    TRACKING_EVENT: {
      trackingVer: process.env.TRACKING_VER || "0.06",
      gaId: process.env.TRACKING_EVENT_GA_ID || "G-Y5781NKN6D"
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
      AdOfficialAccountId: "690c8cba53934c138e997f7685e98412_oa"
    },
    APP_DEBUG_MODE: true,
    TRACKER_DEBUG_MODE: true
  }
});
