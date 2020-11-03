<template>
  <div class="_planet-audiovisual-index">
    <b-audiovisual v-for="(item, index) in source" :key="index" :data="item" />
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
  mounted() {
    const payload = {
      pageIndex: 1,
      pageSize: 5,
    };
    this.$store
      .dispatch("audiovisual/fetch", payload)
      .then((list) => (this.source = list));
  },
  methods: {
    loadMore() {},
  },
};
</script>

<style>
</style>
