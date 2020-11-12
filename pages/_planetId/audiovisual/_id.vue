<template>
  <div class="_planet-audiovisual-index">
    <b-audiovisual-block :top-priority-id="id" :planetId="planetId" masonry />
  </div>
</template>

<script>
import audiovisuals from "@/assets/json/fake/audiovisual.json";

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

<style>
</style>
