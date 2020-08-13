<template>
  <div :class="{
      'b-news-tag': true,
      tagged: tagged
    }" @click="$emit('toggle')">
    <div class="b-news-tag__title">{{titleLabel}}</div>
  </div>
</template>

<script>
export default {
  props: {
    titleLabel: {
      type: String,
      default: "標籤分類"
    },
    tagged: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.b-news-tag {
  border: 1px solid #979797;
  font-size: 0.8em;
  border-radius: 20px;
}
.b-news-tag.tagged {
  background: #393939;
}
.b-news-tag.tagged .b-news-tag__title {
  color: #ffffff;
}
.b-news-tag__title {
  color: #979797;
  padding: 2px 14px;
}
</style>
