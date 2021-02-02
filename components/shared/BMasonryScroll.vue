<template>
  <div class="b-masonry-scroll" :style="style">
    <b-masonry-proxy
      v-for="(item, index) in source"
      :key="index"
      :class="{
        first: index === 0,
        'load-more-triggerable':
          triggerablePredicate(item) && triggerable(index),
      }"
      :load-more-triggerable="triggerablePredicate(item) && triggerable(index)"
      :style="{
        transform: getTranslateXY(index),
        width: `${itemWidth}px`,
        height: getHeight(index),
      }"
      @height-changed="(height) => heightChanged(index, height)"
      @load-more="loadMore(index)"
    >
      <!--
      @slot 自訂項目
      @binding {Object} item 自訂結構
      -->
      <slot :item="{ ...item, index }"></slot>
    </b-masonry-proxy>
    <template v-if="loading">
      <div
        class="b-masonry-scroll__placeholder"
        :style="{
          height: `${placeholderHeight}px`,
          top: pageIndex === 1 ? '0px' : undefined,
        }"
      >
        <div
          v-for="index in this.column"
          class="b-masonry-scroll__placeholder-group"
          :key="index"
        >
          <div
            class="b-masonry-scroll__placeholder-item"
            v-for="jndex in 5 - index"
            :key="`placeholder-${index}-${jndex}`"
            :style="placeholderStyle"
          ></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="b-masonry-scroll__no-more">
        <!--
          @slot 當沒有更多項目時顯示
        -->
        <slot name="nomore" />
      </div>
    </template>
  </div>
</template>

<script>
import BMasonryProxy from "../shared/BMasonryScroll/BMasonryProxy";
/**
 * Masonry 卷軸, 又稱作瀑布式排版
 */
export default {
  components: {
    BMasonryProxy,
  },
  props: {
    /**
     * Scroll 項目的物件陣列, 可自訂結構
     */
    source: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * 是否正在載入
     */
    loading: {
      type: Boolean,
      default: true,
    },
    /**
     * 列數, 決定要有幾列 Masonry Scroll
     */
    column: {
      type: Number,
      default: 2,
    },
    /**
     * 篩選出可附加 `載入更多` 的項目, `(event: object): bool`
     */
    triggerablePredicate: {
      type: Function,
      default() {
        return () => true;
      },
    },
    /**
     * Scroll 高度
     */
    scrollHeight: {
      type: String,
      default: "100vh",
    },
    /**
     * placeholder 的 css 樣式, 若 loading 為 true, 會採用此 style 顯示 placeholder
     */
    placeholderStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    everyAmountLoading: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      itemHeights: [],
      itemWidth: 0,
      itemTops: [],
      itemLefts: [],
      pageIndex: 1,
      arranged: false,
      placeholderHeight: 860,
      noMoreTextHeight: 30,
      gap: 10,
    };
  },
  computed: {
    heightWontChanged() {
      return (
        this.source.length > 0 &&
        this.source.every((x) => x.height !== undefined)
      );
    },
    inactiveTotals() {
      return this.source.filter((x) => !this.triggerablePredicate(x)).length;
    },
    style() {
      return {
        minHeight: this.scrollHeight,
        height:
          this.itemTops[this.source.length - 1] +
          this.itemHeights[this.source.length - 1] +
          (this.loading ? this.placeholderHeight : this.noMoreTextHeight) +
          "px",
      };
    },
  },
  methods: {
    init(source) {
      if (this.heightWontChanged) {
        source.forEach((item, index) => {
          this.heightChanged(index, item.height);
        });
        this.arrangeSource(source[0].width);
      }
    },
    getHeight(index) {
      if (this.itemHeights.length > index) {
        return `${this.itemHeights[index]}px`;
      } else {
        return "0px";
      }
    },
    getTranslateXY(index) {
      let x, y;
      if (index === 0) {
        x = y = 0;
      } else {
        const left = this.itemLefts[index];
        const top = this.itemTops[index];
        x = left;
        y = top;
      }
      return `translate(${x}px, ${y}px)`;
    },
    triggerable(index) {
      const index1Base = index + 1;
      return (
        index1Base > this.inactiveTotals &&
        index1Base ===
          this.pageSize * (this.pageIndex - 1) + this.everyAmountLoading
      );
    },
    reset() {
      this.pageIndex = 1;
    },
    heightChanged(index, height) {
      this.$set(this.itemHeights, index, height);
    },
    arrangeSource(width) {
      this.itemWidth = width
        ? width
        : (this.$el.offsetWidth - this.gap) / this.column;
      const groups = Array.from({ length: this.column }, (v, i) => ({
        index: i,
        maxHeight: 0,
        left: i * (this.itemWidth + this.gap),
      }));
      this.itemHeights.forEach((height, index) => {
        if (index < this.column) {
          const group = groups[index];
          this.$set(this.itemTops, index, 0);
          this.$set(this.itemLefts, index, group.left);
          this.$set(groups, index, {
            ...group,
            maxHeight: height + this.gap,
          });
        } else {
          let targetGroup = groups[0];
          groups.forEach((group) => {
            if (!group.index) return;
            if (group.maxHeight < targetGroup.maxHeight) {
              targetGroup = group;
            }
          });
          const updatedGroup = {
            ...targetGroup,
            maxHeight: targetGroup.maxHeight + height + this.gap,
          };
          this.$set(this.itemTops, index, targetGroup.maxHeight);
          this.$set(this.itemLefts, index, targetGroup.left);
          this.$set(groups, targetGroup.index, updatedGroup);
        }
      });
      this.arranged = true;
    },
    loadMore(index) {
      if (this.arranged) {
        /**
         * 載入更多
         * @property {object} pageInfo `{ pageSize, pageIndex }`, pageSize: 一頁有幾筆, pageIndex: 目前第幾頁
         */
        this.$emit("load-more", {
          pageSize: this.pageSize,
          pageIndex: ++this.pageIndex,
        });
      }
    },
  },
  watch: {
    source: {
      immediate: true,
      handler(value) {
        this.init(value);
      },
    },
    itemHeights(value) {
      if (value.length === this.source.length) {
        this.arrangeSource();
      }
    },
  },
};
</script>

<style scoped>
.b-masonry-scroll {
  position: relative;
}
.b-masonry-proxy {
  position: absolute;
}
.b-masonry-proxy.first {
  z-index: 2;
}
.b-masonry-scroll__placeholder {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  width: 100%;
}
.b-masonry-scroll__placeholder,
.b-masonry-scroll__no-more {
  position: absolute;
  bottom: 0px;
}
.b-masonry-scroll__placeholder-group {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 10px;
}
.b-masonry-scroll__placeholder-group:nth-child(even) {
  height: calc(100% + 80px);
}
.b-masonry-scroll__placeholder-item {
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeload;
  animation-timing-function: linear;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 104px;
}
.b-masonry-scroll__no-more {
  display: grid;
  justify-content: center;
  width: 100%;
  color: #00000081;
}
</style>
