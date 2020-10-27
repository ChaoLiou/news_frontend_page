import config from "./nuxt.config";
export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: "https://753f40f86863.ngrok.io/v1",
      beanfunApi: "https://stg-api.beanfun.com/v1",
      trackingApi: "https://fb1b2bcc52bd.ngrok.io/v1"
    },
    TRACKING_EVENT: {
      appVer: "1.0.0",
      appBuild: 1,
      trackingVer: "0.07"
    },
    BUILD: {
      builtAt: new Date().toLocaleString()
    },
    VENDOR_STAGE: {
      enabled: true,
      newsDetailRelativeUrl: "articles/tw/1/1310256393650966528/detail.html"
    },
    DEBUG_MODE: false
  }
});
