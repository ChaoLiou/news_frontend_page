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
import { get_openid_access_token } from "@/assets/js/beanfun_stg.js";

export default {
  data() {
    return {
      newsTitleStickyTop: "",
    };
  },
  middleware: ["planets"],
  computed: {
    planets() {
      return this.$store.getters["planets/list"];
    },
  },
  mounted() {
    // VConsole = new VConsole();
    get_openid_access_token();
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
