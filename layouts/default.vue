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
};
</script>
<style scoped>
</style>
