import config from "./nuxt.config.default";
export default Object.assign(config, {
  env: {
    BASE_URL: {
      backendApi: "",
      beanfunApi: "",
      trackingApi: ""
    },
    TRACKING_EVENT: {
      appVer: "",
      appBuild: 0,
      trackingVer: ""
    },
    BUILD: {
      builtAt: new Date().toLocaleString()
    },
    DEBUG_MODE: false
  }
});
