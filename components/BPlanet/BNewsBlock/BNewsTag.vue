<template>
  <div
    :class="{
      'b-news-tag': true,
      tagged: tagged,
    }"
    @click="$emit('toggle')"
  >
    <div class="b-news-tag__title">{{ titleLabel }}</div>
  </div>
</template>

<script>
export default {
  props: {
    titleLabel: {
      type: String,
      default: "",
    },
    tagged: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.b-news-tag {
  background-color: #fafafa;
  border-radius: 10px;
  line-height: 22px;
}
.b-news-tag.tagged {
  background-color: #767676;
}
.b-news-tag.tagged .b-news-tag__title {
  color: #ffffff;
}
.b-news-tag__title {
  font-size: 13px;
  color: #767676;
  padding: 4px 12px;
}
</style>
