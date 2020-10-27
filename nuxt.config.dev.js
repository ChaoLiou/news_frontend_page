import config from "./nuxt.config.default";
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
    DEBUG_MODE: true
  }
});
