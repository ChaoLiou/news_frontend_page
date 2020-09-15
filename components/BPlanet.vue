<template>
  <div class="b-planet">
    <template v-for="(contentType, index) in (fakeplanet ? fakeplanet.contentTypes : [])">
      <b-audiovisual-block
        v-if="contentType.id === 'audiovisual'"
        :key="index"
        :title-label="contentType.title"
        :source="contentType.items"
      />
      <b-live-broadcast-block
        v-else-if="contentType.id === 'livebroadcast'"
        :key="index"
        :title-label="contentType.title"
        :source="contentType.items"
      />
      <b-news-block
        v-else-if="contentType.id === 'news'"
        :key="index"
        :title-label="contentType.title"
        :source="contentType.items"
        :tags="contentType.tags"
        :planetId="planet.id"
        :sticky-top="newsBlockTitleStickyTop"
      />
    </template>
  </div>
</template>

<script>
import BAudiovisualBlock from "@/components/BPlanet/BAudiovisualBlock.vue";
import BLiveBroadcastBlock from "@/components/BPlanet/BLiveBroadcastBlock.vue";
import BNewsBlock from "@/components/BPlanet/BNewsBlock.vue";
import planetsConf from "@/assets/json/planets.json";
import fakedata from "@/assets/json/fakedata.json";

export default {
  components: {
    BAudiovisualBlock,
    BLiveBroadcastBlock,
    BNewsBlock,
  },
  props: {
    planet: {
      type: Object,
      default() {
        return {};
      },
    },
    newsTags: {
      type: Array,
      default() {
        return [];
      },
    },
    newsBlockTitleStickyTop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      fakeplanet: undefined,
    };
  },
  mounted() {
    this.fakeplanet = this.$combineFakeData(planetsConf, fakedata).find(
      (p) => p._id === this.planet.id
    );
  },
};
</script>

<style scoped>
.b-planet > * {
  margin-left: 12px;
}
.b-planet > *:not(:last-child) {
  margin-bottom: 12px;
}
.b-planet > .b-news-block {
  margin-right: 12px;
}
</style>
