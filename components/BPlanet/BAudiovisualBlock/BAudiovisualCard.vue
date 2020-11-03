<template>
  <nuxt-link
    class="b-audiovisual-card"
    :to="`/${data.planetId}/audiovisual/${data.id}`"
  >
    <div
      class="b-audiovisual-card__body"
      :style="{ width, minWidth: width, height, minHeight: height }"
    >
      <div class="b-audiovisual-card__thumbnail">
        <div class="b-audiovisual-card__thumbnail-img" ref="thumbnailImg"></div>
        <div
          class="b-audiovisual-card__play-icon b-audiovisual-card__play-icon_center"
        >
          <div></div>
        </div>
        <div class="b-audiovisual-card__info">
          <div class="b-audiovisual-card__viewers">{{ viewers }}</div>
          <div class="b-audiovisual-card__title">{{ data.title }}</div>
          <div class="b-audiovisual-card__source">{{ data.source }}</div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { formatNumber } from "@/assets/js/formatter";
export default {
  props: {
    data: {
      type: Object,
      default() {
        return undefined;
      },
    },
    width: {
      type: String,
      default: "320px",
    },
    height: {
      type: String,
      default: "228px",
    },
  },
  computed: {
    viewers() {
      return `${formatNumber(this.data.viewers)}次觀看`;
    },
  },
  mounted() {
    const thumbnailImgDOM = this.$refs.thumbnailImg;
    const $rootDOM = this.$el;
    const parentVueComp = this.$parent;
    var thumbnailImage = new Image();
    thumbnailImage.onload = () => {
      thumbnailImgDOM.style.backgroundImage = `url(${this.data.img})`;
      parentVueComp.$emit("heightChanged", $rootDOM.offsetHeight);
    };
    thumbnailImage.src = this.data.img;
  },
  methods: {
    heightChanged() {
      if (this.$el.offsetHeight > 0) {
        this.$parent.$emit("heightChanged", this.$el.offsetHeight);
      }
    },
  },
  watch: {
    thumbnail(value) {
      const thumbnailImgDOM = this.$refs.thumbnailImg;
      const $rootDOM = this.$el;
      const parentVueComp = this.$parent;
      var thumbnailImage = new Image();
      thumbnailImage.onload = () => {
        thumbnailImgDOM.style.backgroundImage = `url(${value})`;
        parentVueComp.$emit("heightChanged", $rootDOM.offsetHeight);
      };
      thumbnailImage.src = value;
    },
  },
};
</script>

<style scoped>
.b-audiovisual-card {
  display: block;
}
.b-audiovisual-card__body {
  border-radius: 16px;
  overflow: hidden;
  border: 0.5px solid #dbdbdb;
}
.b-audiovisual-card-card > div {
  background-color: #fafafa;
}
.b-audiovisual-card__thumbnail {
  width: 100%;
  height: 100%;
  position: relative;
}
.b-audiovisual-card__thumbnail-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 1;
}
.b-audiovisual-card__play-icon {
  position: absolute;
  width: fit-content;
  height: fit-content;
  z-index: 2;
}
.b-audiovisual-card__play-icon > div {
  background-image: url("/icons/btn_play.svg");
  width: 50px;
  height: 50px;
}
.b-audiovisual-card__play-icon_center {
  left: 50%;
  transform: translate(-50%, -50%);
  top: calc(50% - 44px);
}
.b-audiovisual-card__info {
  position: absolute;
  z-index: 2;
  bottom: 0px;
  background-color: #262626;
  padding: 12px;
  display: grid;
  row-gap: 4px;
  width: calc(100% - 24px);
}
.b-audiovisual-card__viewers {
  color: #26d07c;
  font-weight: 400;
  font-size: 13px;
  line-height: 18.2px;
}
.b-audiovisual-card__title {
  color: #ffffff;
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.b-audiovisual-card__source {
  font-weight: 400;
  font-size: 13px;
  line-height: 18.2px;
  color: #d3d3d3;
}
</style>
