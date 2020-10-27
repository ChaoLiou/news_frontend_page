<template>
  <div class="b-planet">
    <template v-for="(contentType, index) in planetConf.contentTypes">
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
        :planet-id="planetId"
        :sticky-top="newsBlockTitleStickyTop"
        :vendor-stage-env="vendorStageEnv"
      />
    </template>
  </div>
</template>

<script>
import planetConf from "@/assets/json/planets.json";

export default {
  props: {
    planet: {
      type: Object,
      default() {
        return undefined;
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
      vendorStageEnv: process.env.VENDOR_STAGE,
    };
  },
  computed: {
    planetId() {
      return this.planet ? this.planet.id : 0;
    },
    planetConf() {
      return planetConf.find((p) => p.id === this.planet.id);
    },
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
