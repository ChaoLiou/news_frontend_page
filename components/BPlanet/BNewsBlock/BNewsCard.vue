<template>
  <div
    class="b-news-card"
    :class="{
      'b-news-card_recommendation':
        recommendationStyleEnabled && data.recommendation,
    }"
    @click="navigate"
  >
    <div class="b-news-card__body">
      <div class="b-news-card__thumbnail">
        <img
          v-if="autoImgHeight && !imgLoadingError"
          class="b-news-card__thumbnail-img"
          :class="{ 'b-news-card__thumbnail-img_loading': imgLoading }"
          :style="imgLoading ? { height: defaultImgHeight } : undefined"
          :src="data.img"
          :alt="data.img"
          ref="img"
          @load="imgOnLoad"
          @error="imgOnError"
        />
        <div
          v-else
          class="b-news-card__thumbnail-img"
          :style="thumbnailImgStyle"
        ></div>
      </div>
      <div class="b-news-card__info">
        <div class="b-news-card__title">{{ data.title }}</div>
        <div class="b-news-card__source">{{ data.source.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from "vue-types";
const RECOMMENDATION_ENABLED = process.env.RECOMMENDATION_ENABLED;
const IMAGE_STATUS_TYPE = {
  LOADING: 1,
  LOADED: 2,
  NULL: 3,
};
/**
 * 新聞卡片
 */
export default {
  props: {
    data: VueTypes.shape({
      id: VueTypes.string, // 新聞 Id
      title: VueTypes.string, // 新聞標題
      updateTimeUnix: VueTypes.integer, // 新聞更新時間
      publishTimeUnix: VueTypes.integer, // 新聞發布時間
      link: VueTypes.string, // 新聞內頁連結
      externalLink: VueTypes.string, // 新聞外部連結
      img: VueTypes.string, // 新聞代表圖片網址
      source: VueTypes.shape({
        name: VueTypes.string, // 新聞來源 - 名稱
        logoImage: VueTypes.string, // 新聞來源 - logo 圖片網址
      }),
      representativePlanet: VueTypes.shape({
        name: VueTypes.string, // 新聞所屬星球中第一個星球 - 名稱
        id: VueTypes.number, // 新聞所屬星球中第一個星球 - 星球 Id
      }),
      categories: VueTypes.arrayOf(
        VueTypes.shape({
          name: VueTypes.string, // 新聞所屬分類 - 分類名稱
        })
      ),
      recommendation: VueTypes.bool, // 是否為推薦新聞
      index: VueTypes.integer, // 新聞 index
    }),
    /**
     * 依據圖片比例, 於寬度固定下, 自動調整高度
     */
    autoImgHeight: {
      type: Boolean,
      default: true,
    },
    /**
     * 固定圖片框高度(css height), 圖片會照比例塞進圖片框. (autoImgHeight ? 用於圖片載入前預設高度 : 圖片固定高度)
     */
    defaultImgHeight: {
      type: String,
      default: "100px",
    },
  },
  data() {
    return {
      imgStatus: IMAGE_STATUS_TYPE.LOADING,
      imgLoadingError: false,
      recommendationStyleEnabled: RECOMMENDATION_ENABLED.style,
    };
  },
  computed: {
    imgLoading() {
      return this.imgStatus === IMAGE_STATUS_TYPE.LOADING;
    },
    thumbnailImgStyle() {
      return {
        height: this.defaultImgHeight,
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
    imgOnError() {
      this.imgLoadingError = true;
    },
    navigate() {
      /**
       * 點擊新聞
       * @property {Object} data 新聞資料, 結構如同 data property
       */
      this.$emit("navigate", this.data);
    },
    heightChanged() {
      if (this.$el.offsetHeight > 0) {
        /**
         * 高度更動
         * @property {number} height 更動後的新高度
         */
        this.$emit("height-changed", this.$el.offsetHeight);
        this.$parent.$emit("height-changed", this.$el.offsetHeight);
      }
    },
    imgOnLoad() {
      this.imgStatus = IMAGE_STATUS_TYPE.LOADED;
    },
  },
};
</script>

<style scoped>
.b-news-card {
  display: block;
}
.b-news-card:hover {
  cursor: pointer;
}
.b-news-card__body {
  width: 100%;
  background-color: #fafafa;
  border-radius: 16px;
  overflow: hidden;
  border: 0.5px solid #dbdbdb;
}
.b-news-card__thumbnail {
  overflow: hidden;
  position: relative;
  background-color: #eeeeee;
}
.b-news-card__thumbnail-img {
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: height 1s ease-in;
}
.b-news-card__info {
  padding: 12px 12.45px;
  display: grid;
  row-gap: 4px;
}
.b-news-card__source {
  font-weight: 400;
  font-size: 13px;
  line-height: 18.2px;
  color: #767676;
  font-weight: 400;
}
.b-news-card__title {
  font-weight: bold;
  line-height: 21px;
  font-size: 15px;
}
.b-news-card_recommendation .b-news-card__body {
  border-color: #26d07c;
  background-color: #26d07b46;
}
.b-news-card__thumbnail-img_loading {
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
