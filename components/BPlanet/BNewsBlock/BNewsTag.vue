<template>
  <div
    class="b-news-tag"
    :class="{
      'b-news-tag_selected': selected
    }"
    @click="toggle"
  >
    <div class="b-news-tag__title">{{ titleText }}</div>
  </div>
</template>

<script>
/**
 * 新聞標籤
 */
export default {
  props: {
    /**
     * 標題文字
     */
    titleText: {
      type: String,
      default: ""
    },
    /**
     * 被選取
     */
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      /**
       * 切換選取
       */
      this.$emit("toggle");
    }
  }
};
</script>

<style lang="scss" scoped>
.b-news-tag {
  background: {
    color: #fafafa;
  }
  border: {
    radius: 10px;
  }
  line: {
    height: 22px;
  }
  user: {
    select: none;
  }
  &:hover {
    cursor: pointer;
  }
  &_selected {
    background: {
      color: #767676;
    }
  }
  &_selected &__title {
    color: #ffffff;
  }
  &__title {
    font: {
      size: 13px;
    }
    color: #767676;
    padding: 4px 12px;
  }
}
</style>
