import config from "./nuxt.config.base";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: "https://09d68911a667.ngrok.io/v1",
      trackingApi: "https://d83fe1d42f6e.ngrok.io/v1",
      recommendationApi: "https://stg-news-api.beanfun.com/v1"
    },
    BGO: {
      BgoOfficialAccountId: "5e586fb595c54ca9a1fda284785094d6_oa",
      token: "c46ce549ba424590ab4e2cc7477359da_oat",
      secret: "b8374d28449e4ff1974c67ecd419e866_oas",
      clientId: "1A31B3F8-C08C-411C-8CC9-F9B24D638A61",
      widgetId: "5f9a8945e0dd4c000728183f"
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
      detailUrls: ["articles/tw/1/1358630822793449472/detail.html"],
      openId: ""
    },
    VIDEO_IMAGE: {
      size: ["default", "medium", "high", "standard", "maxres"][3]
    },
    NO_ALLOW_COUNTRY_AREA: "HK",
    AD: {
      AdOfficialAccountId: "690c8cba53934c138e997f7685e98412_oa"
    },
    APP_DEBUG_MODE: true,
    TRACKER_DEBUG_MODE: true
  }
});
