<template>
  <div class="b-planet">
    <template v-for="(block, index) in blocks">
      <b-audiovisual-block
        v-if="block.id === 'audiovisual'"
        :key="index"
        :title-text="block.title"
        :planet-id="planetId"
      />
      <b-news-block
        v-else-if="block.id === 'news'"
        :key="index"
        :title-text="block.title"
        :planet-id="planetId"
        :sticky-top="newsBlockToolBarStickyTop"
      />
    </template>
  </div>
</template>

<script>
import planetConfigs from "./../assets/json/planets.json";
/**
 * 星球主頁內容, 包含兩區塊: 影音與新聞
 */
export default {
  props: {
    /**
     * 星球 Id
     */
    planetId: {
      type: [Number, String],
      default: -1,
    },
    /**
     * 設定新聞區塊工具列需要 sticky 在 top 多少的位置
     */
    newsBlockToolBarStickyTop: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    blocks() {
      const target = planetConfigs.find((x) => x.id === this.planetId);
      return target
        ? target.blocks
        : [
            {
              id: "audiovisual",
            },
            {
              id: "news",
            },
          ];
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
