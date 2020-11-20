<template>
  <div class="b-masonry-scroll" :style="style">
    <b-masonry-proxy
      v-for="(item, index) in items"
      :key="index"
      :class="{ 'trigger-loading-more': triggerable(index) }"
      :trigger-loading-more="triggerable(index)"
      :style="{
        gridRowEnd: getGridRowEnd(index),
      }"
      @heightChanged="(height) => heightChanged(index, height)"
      @load-more="loadMore(index)"
    >
      <slot :item="{ ...item, index }"></slot>
    </b-masonry-proxy>
    <template v-if="loading">
      <div
        class="b-masonry-scroll__placeholder"
        :style="{
          gridRowEnd: getGridRowEnd(index),
        }"
        v-for="index in rowSpans.length"
        :key="`placeholder-${index}`"
      ></div>
    </template>
    <div class="b-masonry-scroll__no-more" v-else>
      <slot name="nomore" />
    </div>
  </div>
</template>

<script>
import BMasonryProxy from "../shared/BMasonryScroll/BMasonryProxy";
export default {
  components: {
    BMasonryProxy,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: true,
    },
    column: {
      type: Number,
      default: 2,
    },
    autoAdjustHeight: {
      type: Boolean,
      default: true,
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
    style() {
      return {
        gridTemplateColumns: `repeat(${this.column}, minmax(150px, 1fr))`,
        gridAutoRows: this.autoAdjustHeight ? "10px" : undefined,
        gridGap: this.autoAdjustHeight ? "10px" : undefined,
      };
    },
  },
  mounted() {
    this.rowSpans = Array.from({ length: this.items.length }, (v, i) => 0);
  },
  methods: {
    getGridRowEnd(index) {
      if (this.autoAdjustHeight) {
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
      if ((index + 1) * 2 === this.pageIndex * this.pageSize) {
        this.$emit("load-more", {
          pageSize: this.pageSize,
          pageIndex: ++this.pageIndex,
        });
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
  background: #f6f7f8;
  background: #eeeeee;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 104px;
  position: relative;
}
.b-masonry-scroll__no-more {
  grid-column: 1/-1;
  grid-row-end: span 2;
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
