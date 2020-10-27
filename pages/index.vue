<template>
  <div class="index">
    <b-tab-view :source="planets" @ready="tabViewReady">
      <template v-slot:tab="props">
        <div>{{ props.item.name }}</div>
      </template>
      <template v-slot:tab-item="props">
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
      this.newsTitleStickyTop = `${tabsHeight}px`;
    },
  },
};
</script>

<style scoped>
</style>
