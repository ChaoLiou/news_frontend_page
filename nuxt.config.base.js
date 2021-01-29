export default {
  /*
   ** Nuxt ssr
   ** See https://nuxtjs.org/api/configuration-ssr
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: "https://www.youtube.com/iframe_api", defer: true },
      {
        src:
          // "https://beangostg.blob.core.windows.net/beango-static-stg/sdk/beango_stg.min.js",
          "https://beangostg.blob.core.windows.net/beango-static-stg/sdk/beanfun.min.js",
        group: "beanfun_vue_tracker"
      },
      {
        src:
          "https://beangochat.blob.core.windows.net/beango-static-prod/sdk/vconsole.min.js",
        group: "vconsole"
      },
      {
        src: "/beanfun_tracker/sdk/beanfun_tracker-0.01.min.js",
        group: "beanfun_vue_tracker"
      },
      {
        src: "/polyfill/intersection-observer.js",
        group: "beanfun_vue_tracker"
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/style/all.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["@/plugins/mixin"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  router: {
    mode: "hash",
    middleware: ["init", "redirect"]
  },
  loadingIndicator: "@/loadingIndicator/index.html"
};
