<template>
  <div class="b-planet">
    <template v-for="(contentType, index) in planetConf.contentTypes">
      <b-audiovisual-block
        v-if="contentType.id === 'audiovisual'"
        :key="index"
        :title-label="contentType.title"
        :planet-id="planet.id"
      />
      <b-live-broadcast-block
        v-else-if="contentType.id === 'livebroadcast'"
        :key="index"
        :title-label="contentType.title"
      />
      <b-news-block
        v-else-if="contentType.id === 'news'"
        :key="index"
        :title-label="contentType.title"
        :planet-id="planet.id"
        :sticky-top="newsBlockTitleStickyTop"
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
      type: Number,
      default: 0,
    },
  },
  computed: {
    planetConf() {
      return planetConf.find((p) => p.id === this.planet.id);
    },
  },
};
</script>

<style scoped>
.b-planet > * {
  margin-left: 12px;
  padding-top: 12px;
}
.b-planet > *:not(:last-child) {
  margin-bottom: 12px;
}
.b-planet > .b-news-block {
  margin-right: 12px;
}
</style>
