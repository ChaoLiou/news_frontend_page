<template>
  <div
    class="b-news-tag"
    :class="{
      'b-news-tag__selected': selected,
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
      default: "",
    },
    /**
     * 被選取
     */
    selected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      /**
       * 切換選取
       */
      this.$emit("toggle");
    },
  },
};
</script>

<style scoped>
.b-news-tag {
  background-color: #fafafa;
  border-radius: 10px;
  line-height: 22px;
  user-select: none;
}
.b-news-tag:hover {
  cursor: pointer;
}
.b-news-tag__selected {
  background-color: #767676;
}
.b-news-tag__selected .b-news-tag__title {
  color: #ffffff;
}
.b-news-tag__title {
  font-size: 13px;
  color: #767676;
  padding: 4px 12px;
}
</style>
