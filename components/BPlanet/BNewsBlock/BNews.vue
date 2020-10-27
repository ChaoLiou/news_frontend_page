<template>
  <div class="b-news" @click="navigate">
    <div class="b-news__card">
      <div class="b-news__thumbnail">
        <img
          class="b-news__thumbnail-img"
          :src="data.img"
          :alt="data.img"
          @load="heightChanged"
        />
      </div>
      <div class="b-news__info">
        <div class="b-news__source">{{ data.source }}</div>
        <div class="b-news__title">{{ data.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "b-news",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    window.addEventListener("resize", this.heightChanged);
  },
  methods: {
    navigate() {
      this.$emit("navigate", this.data);
    },
    heightChanged() {
      if (this.$el.offsetHeight > 0) {
        this.$parent.$emit("heightChanged", this.$el.offsetHeight);
      }
    },
  },
};
</script>

<style scoped>
.b-news {
  display: block;
}
.b-news__card {
  width: 100%;
  background-color: #fafafa;
  border-radius: 6px;
  overflow: hidden;
  border: 0.5px solid #dbdbdb;
}
.b-news__thumbnail {
  overflow: hidden;
  position: relative;
}
.b-news__thumbnail-img {
  width: 100%;
}
.b-news__info {
  padding: 10px;
  font-size: 0.8em;
}
.b-news__source {
  font-size: 0.8em;
  color: #979797;
  font-weight: bold;
}
.b-news__title {
  font-weight: bold;
}
</style>
