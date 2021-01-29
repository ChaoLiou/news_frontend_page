<template>
  <div class="index">
    <b-tab-view
      :source="source"
      @ready="tabViewReady"
      @switch-tab="switchPlanet"
    >
      <template #tab="props">
        <div
          class="planet-tab-title"
          :class="{
            'planet-tab-title_marked': isMarked(props.item),
            'planet-tab-title__placeholder': !props.item.name,
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
  asyncData({ env }) {
    return {
      env,
    };
  },
  middleware: ["appCache"],
  async mounted() {
    console.log({ env: this.env });
    await eventMiddleware({ store: this.$store, env: this.env });
    await planetMiddleware({ store: this.$store });
  },
  computed: {
    planets() {
      return this.$store.getters["planet/list"];
    },
    source() {
      return Array.isArray(this.planets) && this.planets.length > 0
        ? this.planets
        : undefined;
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
  watch: {
    async planets(value) {
      if (Array.isArray(value) && value.length > 0) {
        await trackEvent(
          view_landing_page.id,
          view_landing_page.category,
          view_landing_page.action,
          view_landing_page.formatPayload(value[0].name)
        );
      }
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
.planet-tab-title__placeholder > div {
  width: 3em;
  height: 1.2em;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeload;
  animation-timing-function: linear;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 104px;
}
</style>
