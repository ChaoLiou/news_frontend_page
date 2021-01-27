<template>
  <div class="index">
    <b-tab-view
      :source="planets"
      @ready="tabViewReady"
      @switch-tab="switchPlanet"
    >
      <template #tab="props">
        <div
          class="planet-tab-title"
          :class="{
            'planet-tab-title_marked': isMarked(props.item),
          }"
        >
          <div>
            {{ props.item.name }}
          </div>
          <b-dot-icon
            v-if="isMarked(props.item)"
            class="planet-tab-title__dot-icon"
          />
        </div>
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
import { view_landing_page, click_tab } from "@/assets/js/tracking/events";
import { trackEvent } from "@/assets/js/tracking";
import eventMiddleware from "@/middleware/event";
import planetMiddleware from "@/middleware/planet";
import BNIcon from "@/components/shared/icons/BNIcon";
import { MarkedType } from "@/assets/js/constants.js";

export default {
  components: {
    BNIcon,
  },
  data() {
    return {
      newsBlockToolBarStickyTop: 0,
      selectedTab: undefined,
    };
  },
  middleware: ["appCache"],
  async asyncData(context) {
    try {
      await eventMiddleware(context);
      await planetMiddleware(context);
    } catch (err) {
      console.log({ indexAsyncData: err });
    }
  },
  async mounted() {
    await trackEvent(
      view_landing_page.id,
      view_landing_page.category,
      view_landing_page.action,
      view_landing_page.formatPayload(this.selectedTab.name)
    );
  },
  computed: {
    planets() {
      return this.$store.getters["planet/list"];
    },
  },
  methods: {
    isMarked(item) {
      return item.activity_flag === MarkedType.Marked;
    },
    tabViewReady({ tabBarDOM, selectedTab }) {
      this.newsBlockToolBarStickyTop = tabBarDOM.offsetHeight - 1;
      this.selectedTab = selectedTab;
    },
    async switchPlanet(planet) {
      await trackEvent(
        click_tab.id,
        click_tab.category,
        click_tab.action,
        click_tab.formatPayload(planet.name)
      );
    },
  },
};
</script>

<style scoped>
.planet-tab-title.planet-tab-title_marked {
  position: relative;
}
.planet-tab-title_marked > .planet-tab-title__dot-icon {
  position: absolute;
  right: 0px;
  top: 0px;
  margin-right: -16px;
}
</style>
