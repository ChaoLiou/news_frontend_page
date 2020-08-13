<template>
  <div class="b-masonry-scroll">
    <b-masonry-proxy
      v-for="(item, index) in items"
      :key="index"
      ref="items"
      :class="{ 'trigger-loading-more': index === pageSize && pageIndex < 5 }"
      :trigger-loading-more="index === pageSize && pageIndex < 5"
      :style="{ gridRowEnd: rowSpans.length > 0 ? `span ${rowSpans[index]}` : `auto` }"
      @heightChanged="(height) => heightChanged(index, height)"
      @load-more="$emit('load-more', { pageSize, pageIndex: pageIndex++ })"
    >
      <slot :item="{ ...item, index }"></slot>
    </b-masonry-proxy>
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
  },
  data() {
    return {
      rowSpans: [],
      observer: undefined,
      pageIndex: 0,
    };
  },
  computed: {
    pageSize() {
      return this.items.length - 1;
    },
  },
  mounted() {
    this.rowSpans = Array.from({ length: this.items.length }, (v, i) => 0);
    this.$emit("load-more", {
      pageSize: 10,
      pageIndex: this.pageIndex,
    });
  },
  methods: {
    heightChanged(index, height) {
      this.$set(this.rowSpans, index, Math.ceil((height + 10) / 20));
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
</style>
