<template>
  <div
    class="b-news"
    :class="{ 'b-news_recommendation': data.recommendation }"
    @click="navigate"
  >
    <div class="b-news__card">
      <div class="b-news__thumbnail">
        <img
          v-if="autoImgHeight"
          class="b-news__thumbnail-img"
          :class="{ 'b-news__thumbnail-img_loading': imgLoading }"
          :style="imgLoading ? { height: `${defaultImgHeight}px` } : undefined"
          :src="data.img"
          :alt="data.img"
          ref="img"
          @load="imgOnLoad"
          @error="imgOnLoad"
        />
        <div
          v-else
          class="b-news__thumbnail-img"
          :style="thumbnailImgStyle"
        ></div>
      </div>
      <div class="b-news__info">
        <div class="b-news__title">{{ data.title }}</div>
        <div class="b-news__source">{{ data.source.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const IMAGE_STATUS_TYPE = {
  LOADING: 1,
  LOADED: 2,
  NULL: 3,
};
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
    defaultImgHeight: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      imgStatus: IMAGE_STATUS_TYPE.LOADING,
    };
  },
  computed: {
    imgLoading() {
      return this.imgStatus === IMAGE_STATUS_TYPE.LOADING;
    },
    thumbnailImgStyle() {
      return {
        height: `${this.defaultImgHeight}px`,
        backgroundImage: `url(${this.data.img})`,
      };
    },
  },
  mounted() {
    this.heightChanged();
  },
  updated() {
    if (this.imgStatus === IMAGE_STATUS_TYPE.LOADED) {
      this.heightChanged();
      this.imgStatus = IMAGE_STATUS_TYPE.NULL;
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
    imgOnLoad() {
      this.imgStatus = IMAGE_STATUS_TYPE.LOADED;
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
  transition: height 1s ease-in;
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
.b-news_recommendation .b-news__card {
  border-color: #26d07c;
  background-color: #26d07b46;
}
.b-news__thumbnail-img_loading {
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeload;
  animation-timing-function: linear;
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
