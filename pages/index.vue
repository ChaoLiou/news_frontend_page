<template>
  <div class="index">
    <b-tab-view :source="planets" @ready="tabViewReady">
      <template #tab="props">
        <div>{{ props.item.name }}</div>
      </template>
      <template #tab-item="props">
        <b-planet
          :planet="props.item"
          :key="props.item.id"
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
      newsTitleStickyTop: 0,
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
      this.newsTitleStickyTop = tabsHeight - 1;
    },
  },
};
</script>

<style scoped>
</style>
