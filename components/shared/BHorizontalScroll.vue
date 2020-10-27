<template>
  <div class="b-horizontal-scroll" :style="{ maxWidth }">
    <slot></slot>
    <div
      v-if="fadeOut && fadeOutEnabled"
      class="b-horizontal-scroll__fade-mask"
      :style="{ height: `${fadeOutMaskHeight}px`, top: `${fadeOutMaskTop}px` }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: String,
      default: "100%",
    },
    fadeOut: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fadeOutEnabled: true,
      fadeOutMaskHeight: 0,
      fadeOutMaskTop: 0,
    };
  },
  mounted() {
    const { height, top, width } = this.$el.getBoundingClientRect();
    if (this.fadeOut) {
      this.fadeOutMaskHeight = height;
      this.fadeOutMaskTop = top;
    }
    this.$el.addEventListener("scroll", (e) => {
      const scrolledWidth = e.target.scrollLeft + width;
      const scrollableWidth = e.target.scrollWidth - scrolledWidth;
      this.fadeOutEnabled = scrollableWidth > 0;
    });
  },
};
</script>

<style scoped>
.b-horizontal-scroll {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding: 4px 0px;
  position: relative;
}
.b-horizontal-scroll > * {
  z-index: 1;
  flex-shrink: 0;
}
.b-horizontal-scroll__fade-mask {
  z-index: 2;
  position: fixed;
  top: 0px;
  right: 0px;
  width: 3em;
  height: 100%;
  background: linear-gradient(270deg, #fafafa 30%, rgba(250, 250, 250, 0) 70%);
}
</style>
