<template>
  <div class="_planet-audiovisual-index">
    <b-audiovisual-block
      :top-priority-id="id"
      :planetId="planetId"
      vertical
      :show-title-text="false"
    />
  </div>
</template>

<script>
import eventMiddleware from "@/middleware/event";

export default {
  data() {
    return {
      source: [],
    };
  },
  asyncData({ env }) {
    return {
      env,
    };
  },
  computed: {
    planetId() {
      return parseInt(this.$route.params.planetId);
    },
    id() {
      return this.$route.params.id;
    },
  },
    async mounted() {
    console.log({ env: this.env });
    await eventMiddleware({ store: this.$store, env: this.env });
  },
};
</script>

<style scoped>
</style>
