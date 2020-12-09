<template>
  <div class="b-horizontal-scroll" :style="{ maxWidth }">
    <template v-if="loading">
      <div
        v-for="index in 10"
        class="b-horizontal-scroll__placeholder-item"
        :key="index"
        :style="placeholderStyle"
      ></div>
    </template>
    <template v-else>
      <slot></slot>
    </template>
    <div
      v-show="fadeOut && fadeOutEnabled"
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
    loading: {
      type: Boolean,
      default: false,
    },
    placeholderStyle: {
      type: Object,
      default() {
        return {};
      },
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
  overflow-y: hidden;
  padding: 4px 0px;
  position: relative;
}
.b-horizontal-scroll > * {
  z-index: 1;
  flex-shrink: 0;
}
.b-horizontal-scroll__fade-mask {
  z-index: 2;
  position: sticky;
  top: 0px;
  right: 0px;
  width: 42px;
  height: 100%;
  background: linear-gradient(270deg, #fafafa 30%, rgba(250, 250, 250, 0) 70%);
}
.b-horizontal-scroll__placeholder-item {
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeload;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: #eeeeee;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 104px;
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
