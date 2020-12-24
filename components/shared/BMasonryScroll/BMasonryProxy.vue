<template>
  <div class="b-masonry-proxy">
    <!--
      @slot Masonry Scroll 的項目
    -->
    <slot></slot>
  </div>
</template>

<script>
/**
 * Masonry Scroll 的項目代理
 */
export default {
  props: {
    /**
     * 決定此代理是否能夠觸發 `載入更多`
     */
    loadMoreTriggerable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      observer: undefined,
    };
  },
  mounted() {
    if (this.loadMoreTriggerable) {
      this.observer = new IntersectionObserver(this.handler, {
        root: null,
        threshold: 0,
      });
      this.observer.observe(this.$el);
    }
  },
  methods: {
    handler(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /**
           * 載入更多
           */
          this.$emit("load-more");
        }
      });
    },
  },
  watch: {
    loadMoreTriggerable(value) {
      if (!value) {
        this.observer.disconnect();
        this.observer = undefined;
      }
    },
  },
};
</script>

<style>
</style>
