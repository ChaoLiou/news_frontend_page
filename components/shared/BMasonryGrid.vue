<template>
  <div class="b-masonry-scroll" :style="style">
    <b-masonry-proxy
      v-for="(item, index) in source"
      :key="index"
      :class="{ 'load-more-triggerable': triggerable(index) }"
      :load-more-triggerable="triggerable(index)"
      :style="{
        gridRowEnd: getGridRowEnd(index),
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
          gridRowEnd: index % 2 === 0 ? 'span 11' : 'span 10',
          ...placeholderStyle,
        }"
        v-for="index in 7"
        :key="`placeholder-${index}`"
      ></div>
    </template>
    <div class="b-masonry-scroll__no-more" v-else>
      <!--
          @slot 當沒有更多項目時顯示
        -->
      <slot name="nomore" />
    </div>
  </div>
</template>

<script>
import BMasonryProxy from "../shared/BMasonryScroll/BMasonryProxy";
/**
 * Masonry 卷軸, 又稱作瀑布式排版(使用 css-grid)
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
      default: false,
    },
    /**
     * 列數, 決定要有幾列 Masonry Scroll
     */
    column: {
      type: Number,
      default: 2,
    },
    /**
     * 是否自動調整高度
     */
    autoHeight: {
      type: Boolean,
      default: true,
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
  },
  data() {
    return {
      rowSpans: [],
      observer: undefined,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  computed: {
    heightWontChanged() {
      return (
        this.source.length > 0 &&
        this.source.every((x) => x.height !== undefined)
      );
    },
    style() {
      return {
        gridTemplateColumns: `repeat(${this.column}, minmax(150px, 1fr))`,
        gridAutoRows: this.autoHeight || this.loading ? "10px" : undefined,
        gridGap: this.autoHeight || this.loading ? "10px" : undefined,
      };
    },
  },
  mounted() {
    this.rowSpans = Array.from({ length: this.source.length }, (v, i) => 0);
    this.init(this.source);
  },
  methods: {
    init(source) {
      if (this.heightWontChanged) {
        source.forEach((item, index) => {
          this.heightChanged(index, item.height);
        });
      }
    },
    getGridRowEnd(index) {
      if (this.autoHeight || this.loading) {
        return this.rowSpans.length > 0
          ? `span ${this.rowSpans[index] ? this.rowSpans[index] : "10"}`
          : `span 10`;
      }
    },
    triggerable(index) {
      return (index + 1) % (this.pageSize / 2) === 0;
    },
    reset() {
      this.pageIndex = 1;
    },
    heightChanged(index, height) {
      this.$set(this.rowSpans, index, Math.ceil((height + 10) / 20));
    },
    loadMore(index) {
      const targetIndex = (index + 1) * this.column;
      const totals = this.pageIndex * this.pageSize;
      if (targetIndex === this.pageIndex * this.pageSize) {
        this.emitLoadMore();
      } else if (targetIndex > totals) {
        const currentPageIndex = targetIndex / this.pageSize;
        Array.from(
          { length: currentPageIndex - this.pageIndex },
          () => {}
        ).forEach(() => {
          this.emitLoadMore();
        });
      }
    },
    emitLoadMore() {
      /**
       * 載入更多
       * @property {object} pageInfo `{ pageSize, pageIndex }`, pageSize: 一頁有幾筆, pageIndex: 目前第幾頁
       */
      this.$emit("load-more", {
        pageSize: this.pageSize,
        pageIndex: ++this.pageIndex,
      });
    },
  },
  watch: {
    source(value) {
      if (value) {
        this.init(value);
      }
    },
  },
};
</script>

<style scoped>
.b-masonry-scroll {
  display: grid;
}
.b-masonry-scroll__placeholder {
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeload;
  animation-timing-function: linear;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 104px;
  position: relative;
}
.b-masonry-scroll__no-more {
  grid-column: 1/-1;
  justify-self: center;
  color: #00000081;
}
@keyframes placeload {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
