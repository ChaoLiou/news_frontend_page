<template>
  <div class="b-horizontal-scroll" :style="{ maxWidth }" @scroll="scroll">
    <template v-if="loading">
      <div
        v-for="index in 10"
        class="b-horizontal-scroll__placeholder-item"
        :key="index"
        :style="placeholderStyle"
      ></div>
    </template>
    <template v-else>
      <!--
        @slot 自訂項目
      -->
      <slot></slot>
    </template>
  </div>
</template>

<script>
/**
 * 水平卷軸
 */
export default {
  props: {
    /**
     * 卷軸最大寬度
     */
    maxWidth: {
      type: String,
      default: "100%"
    },
    /**
     * 是否正在載入
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * placeholder 的 css 樣式, 若 loading 為 true, 會採用此 style 顯示 placeholder
     */
    placeholderStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      scrolling: false,
      scrollDetector: {
        interval: 500,
        id: 0
      }
    };
  },
  mounted() {
    const { height, top, width } = this.$el.getBoundingClientRect();
    this.$el.addEventListener("scroll", e => {
      const scrolledWidth = e.target.scrollLeft + width;
      const scrollableWidth = e.target.scrollWidth - scrolledWidth;
    });
  },
  methods: {
    initScrollDetector() {
      if (!this.scrollDetector.id) {
        this.scrollDetector.id = setInterval(() => {
          if (!this.scrolling) {
            this.scrollEnd();
          }
          this.scrolling = false;
        }, this.scrollDetector.interval);
      }
    },
    scroll(event) {
      this.initScrollDetector();
      this.scrolling = true;
      /**
       * 捲動事件
       */
      this.$emit("scroll");
    },
    scrollEnd() {
      clearInterval(this.scrollDetector.id);
      this.scrollDetector.id = 0;
      /**
       * 一次捲動行為中, 最後一次捲動事件
       */
      this.$emit("scroll-end");
    }
  }
};
</script>

<style lang="scss" scoped>
.b-horizontal-scroll {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 4px 0px;
  position: relative;
  & > * {
    z-index: 1;
    flex-shrink: 0;
  }
  &__placeholder-item {
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeload;
    animation-timing-function: linear;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 1200px 104px;
  }
}
</style>
