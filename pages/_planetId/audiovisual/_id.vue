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
export default {
  data() {
    return {
      source: [],
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
};
</script>

<style scoped>
</style>
