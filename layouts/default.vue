<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
const gaId = process.env.TRACKING_EVENT.gaId;

export default {
  head() {
    return {
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=" + gaId,
        },
      ],
    };
  },
  data() {
    return {
      vconsoleSource:
        "https://beangochat.blob.core.windows.net/beango-static-prod/sdk/vconsole.min.js",
    };
  },
  created() {
    if (location.href.includes("vconsole")) {
      const scriptDOM = document.createElement("script");
      scriptDOM.src = this.vconsoleSource;
      scriptDOM.onload = () => {
        new VConsole();
      };
      document.head.append(scriptDOM);
    }
  },
};
</script>
<style scoped>
</style>
