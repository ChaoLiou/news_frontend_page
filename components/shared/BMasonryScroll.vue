<template>
  <div class="b-masonry-scroll">
    <b-masonry-proxy
      v-for="(item, index) in items"
      :key="index"
      ref="items"
      :class="{ 'trigger-loading-more': triggerable(index) }"
      :trigger-loading-more="triggerable(index)"
      :style="{ gridRowEnd: rowSpans.length > 0 ? `span ${rowSpans[index] ? rowSpans[index] : '10'}` : `span 10` }"
      @heightChanged="(height) => heightChanged(index, height)"
      @load-more="loadMore(index)"
    >
      <slot :item="{ ...item, index }"></slot>
    </b-masonry-proxy>
    <template v-if="loading">
      <div
        class="b-masonry-scroll__placeholder"
        :style="{ gridRowEnd: rowSpans.length > 0 ? `span ${rowSpans[index] ? rowSpans[index] : '10'}` : `span 10` }"
        v-for="index in rowSpans.length"
        :key="`placeholder-${index}`"
      ></div>
    </template>
  </div>
</template>

<script>
import BMasonryProxy from "@/components/shared/BMasonryScroll/BMasonryProxy.vue";
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
      default: false,
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
  mounted() {
    this.rowSpans = Array.from({ length: this.items.length }, (v, i) => 0);
  },
  methods: {
    triggerable(index) {
      return (index + 1) % (this.pageSize / 2) === 0 && this.pageIndex < 19;
    },
    reset() {
      this.pageIndex = 1;
    },
    heightChanged(index, height) {
      this.$set(this.rowSpans, index, Math.ceil((height + 10) / 20));
    },
    loadMore(index) {
      // console.log({ pageIndex: this.pageIndex, pageSize: this.pageSize });
      if (index + 1 === this.pageIndex * this.pageSize) {
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
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  grid-auto-rows: 10px;
  grid-gap: 10px;
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
@keyframes placeload {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
