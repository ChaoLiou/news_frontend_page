<template>
  <div class="b-horizontal-scroll" :style="{ maxWidth }">
    <slot></slot>
    <div
      v-if="fade"
      class="b-horizontal-scroll__fade-mask"
      :style="{ height: `${fadeMaskHeight}px` }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: String,
      default: "100%"
    },
    fade: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.fade) {
      this.fadeMaskHeight = this.$el.offsetHeight;
    }
  }
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
  position: absolute;
  top: 0px;
  right: 0px;
  width: 25%;
  height: 100%;
  background: linear-gradient(
    270deg,
    #fafafa 22.47%,
    rgba(250, 250, 250, 0) 82.02%
  );
}
</style>
