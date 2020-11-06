<template>
  <div class="index">
    <b-tab-view :source="planets" @ready="tabViewReady">
      <template #tab="props">
        <div>{{ props.item.name }}</div>
      </template>
      <template #tab-item="props">
        <b-planet
          :planet="props.item"
          :news-block-title-sticky-top="newsTitleStickyTop"
        ></b-planet>
      </template>
    </b-tab-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsTitleStickyTop: "",
    };
  },
  middleware: ["planet"],
  computed: {
    planets() {
      return this.$store.getters["planet/list"];
    },
  },
  methods: {
    tabViewReady({ tabsHeight }) {
      this.newsTitleStickyTop = `${tabsHeight - 1}px`;
    },
  },
};
</script>

<style scoped>
</style>
