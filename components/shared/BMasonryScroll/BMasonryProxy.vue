<template>
  <div class="b-masonry-proxy">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    triggerLoadingMore: {
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
    if (this.triggerLoadingMore) {
      this.observer = new IntersectionObserver(this.handleScroll, {
        root: null,
        threshold: 0,
      });
      this.observer.observe(this.$el);
    }
  },
  methods: {
    handleScroll(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.$emit("load-more");
        }
      });
    },
  },
  watch: {
    triggerLoadingMore(value) {
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
