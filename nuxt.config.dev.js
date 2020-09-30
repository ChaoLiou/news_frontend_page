import config from "./nuxt.config";
export default Object.assign(config, {
  env: {
    BASE_URL: {
      api: "http://10.110.1.200:8079/v1"
    },
    DEBUG_MODE: true
  }
});
