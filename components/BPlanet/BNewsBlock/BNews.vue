<template>
  <div class="b-news" @click="navigate">
    <div class="b-news__card">
      <div class="b-news__thumbnail">
        <img
          v-if="autoImgHeight"
          class="b-news__thumbnail-img"
          :src="data.img"
          :alt="data.img"
          @load="heightChanged"
        />
        <div
          v-else
          class="b-news__thumbnail-img"
          :style="thumbnailImgStyle"
        ></div>
      </div>
      <div class="b-news__info">
        <div class="b-news__title">{{ data.title }}</div>
        <div class="b-news__source">{{ data.source }}</div>
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
    autoImgHeight: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    thumbnailImgStyle() {
      return this.autoImgHeight
        ? undefined
        : { height: "70px", backgroundImage: `url(${this.data.img})` };
    },
  },
  mounted() {
    if (this.autoImgHeight) {
      this.$el.addEventListener("resize", this.heightChanged);
    } else {
      this.heightChanged();
    }
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
  border-radius: 16px;
  overflow: hidden;
  border: 0.5px solid #dbdbdb;
}
.b-news__thumbnail {
  overflow: hidden;
  position: relative;
}
.b-news__thumbnail-img {
  width: 100%;
  background-size: cover;
}
.b-news__info {
  padding: 12px 12.45px;
  display: grid;
  row-gap: 4px;
}
.b-news__source {
  font-weight: 400;
  font-size: 13px;
  line-height: 18.2px;
  color: #767676;
  font-weight: 400;
}
.b-news__title {
  font-weight: bold;
  line-height: 21px;
  font-size: 15px;
}
</style>
