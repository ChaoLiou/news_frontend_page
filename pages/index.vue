<template>
  <div class="index">
    <b-tab-view :source="planets" @ready="tabViewReady">
      <template v-slot:tab="props">
        <div>{{props.item.name}}</div>
      </template>
      <template v-slot:tab-item="props">
        <b-planet :planet="props.item" :news-block-title-sticky-top="newsTitleStickyTop"></b-planet>
      </template>
    </b-tab-view>
  </div>
</template>

<script>
import BPlanet from "@/components/BPlanet.vue";
import planetsConf from "@/assets/json/planets.json";
import fakedata from "@/assets/json/fakedata.json";

export default {
  components: {
    BPlanet,
  },
  data() {
    return {
      planets: [],
      newsTitleStickyTop: "",
    };
  },
  async fetch() {
    this.planets = await this.getPlanets();
  },
  methods: {
    tabViewReady({ tabsHeight }) {
      this.newsTitleStickyTop = `${tabsHeight}px`;
    },
  },
};
</script>

<style scoped>
.planet-news {
  padding-top: 8px;
}
</style>
