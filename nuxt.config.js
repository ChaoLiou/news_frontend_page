import config from "./nuxt.config.default";

export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: process.env.BACKEND_API || "https://753f40f86863.ngrok.io/v1",
      trackingApi:
        process.env.TRACKING_API || "https://fb1b2bcc52bd.ngrok.io/v1"
    },
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
      detailUrls: [
        "articles/tw/1/1310256393650966528/detail.html",
        "articles/tw/1/1323087025544368128/detail.html"
      ]
    },
    VIDEO_IMAGE: {
      size: ["default", "medium", "high", "standard", "maxres"][1]
    },
    DEBUG_MODE: false
  }
});
