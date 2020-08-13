<template>
  <div class="b-planet">
    <template v-for="(contentType, index) in (planet ? planet.contentTypes : [])">
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
      />
    </template>
  </div>
</template>

<script>
import BAudiovisualBlock from "@/components/BPlanet/BAudiovisualBlock.vue";
import BLiveBroadcastBlock from "@/components/BPlanet/BLiveBroadcastBlock.vue";
import BNewsBlock from "@/components/BPlanet/BNewsBlock.vue";
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
