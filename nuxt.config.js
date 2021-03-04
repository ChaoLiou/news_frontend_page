import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: process.env.BACKEND_API || "",
      trackingApi: process.env.TRACKING_API || "",
      recommendationApi: process.env.RECOMMENDATION_API || ""
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
      trackingVer: process.env.TRACKING_VER || "",
      gaId: process.env.TRACKING_EVENT_GA_ID || ""
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
      AdOfficialAccountId: ""
    },
    APP_DEBUG_MODE: true,
    TRACKER_DEBUG_MODE: true
  }
});
