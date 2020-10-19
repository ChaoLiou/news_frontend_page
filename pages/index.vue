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
    const vConsole = new VConsole();
    const id = setInterval(() => {
      const vConsoleDOM = document.querySelector("#__vconsole");
      if (vConsoleDOM.classList.contains("hidden")) {
        clearInterval(id);
        console.log("[Hide vConsole] stop setting vConsole hidden");
      } else {
        vConsoleDOM.classList.add("hidden");
        console.log("[Hide vConsole] vConsole is hidden");
      }
    }, 100);
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
