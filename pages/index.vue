<template>
  <div class="index">
    <b-tab-view
      :source="planets"
      @ready="tabViewReady"
      @switch-tab="switchPlanet"
    >
      <template #tab="props">
        <div>{{ props.item.name }}</div>
      </template>
      <template #tab-item="props">
        <b-planet
          :key="props.item.id"
          :planet-id="props.item.id"
          :news-block-tool-bar-sticky-top="newsBlockToolBarStickyTop"
        ></b-planet>
      </template>
    </b-tab-view>
  </div>
</template>

<script>
import { view_ladning_page, click_tab } from "@/assets/js/tracking/events";
import { trackEvent } from "@/assets/js/tracking";

export default {
  data() {
    return {
      newsBlockToolBarStickyTop: 0,
      selectedTab: undefined,
    };
  },
  middleware: ["planet"],
  async mounted() {
    await trackEvent(
      view_ladning_page.id,
      view_ladning_page.category,
      view_ladning_page.action,
      view_ladning_page.formatPayload(this.selectedTab.name)
    );
  },
  computed: {
    planets() {
      return this.$store.getters["planet/list"];
    },
  },
  methods: {
    tabViewReady({ tabBarDOM, selectedTab }) {
      this.newsBlockToolBarStickyTop = tabBarDOM.offsetHeight - 1;
      this.selectedTab = selectedTab;
    },
    async switchPlanet(planet) {
      await trackEvent(
        click_tab.id,
        click_tab.category,
        click_tab.action,
        click_tab.formatPayload({ planetName: planet.name })
      );
    },
  },
};
</script>

<style scoped>
</style>
