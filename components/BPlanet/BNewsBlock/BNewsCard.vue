<template>
  <div
    class="b-news-card"
    :class="{
      'b-news-card_recommendation':
        recommendationStyleEnabled && data.recommendation
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
        <div class="b-news-card__source">{{ rss.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from "vue-types";
const IMAGE_STATUS_TYPE = {
  LOADING: 1,
  LOADED: 2,
  NULL: 3
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
        rss: VueTypes.shape({
          id: VueTypes.number, // 新聞來源 - RSS Id
          name: VueTypes.string, // 新聞來源 - RSS 名稱
          logoImage: VueTypes.string // 新聞來源 - RSS logo 圖片網址
        }),
        site: VueTypes.shape({
          id: VueTypes.number, // 新聞來源 - 站台 Id
          name: VueTypes.string // 新聞來源 - 站台名稱
        })
      }),
      representativePlanet: VueTypes.shape({
        name: VueTypes.string, // 新聞所屬星球中第一個星球 - 名稱
        id: VueTypes.number // 新聞所屬星球中第一個星球 - 星球 Id
      }),
      representativeCategory: VueTypes.shape({
        name: VueTypes.string, // 新聞所屬星球中第一個分類 - 名稱
        id: VueTypes.number // 新聞所屬星球中第一個分類 - 分類 Id
      }),
      categories: VueTypes.arrayOf(
        VueTypes.shape({
          name: VueTypes.string // 新聞所屬分類 - 分類名稱
        })
      ),
      description: VueTypes.string, // 新聞內容
      recommendation: VueTypes.bool, // 是否為推薦新聞
      index: VueTypes.integer // 新聞 index
    }),
    /**
     * 依據圖片比例, 於寬度固定下, 自動調整高度
     */
    autoImgHeight: {
      type: Boolean,
      default: true
    },
    /**
     * 固定圖片框高度(css height), 圖片會照比例塞進圖片框. (autoImgHeight ? 用於圖片載入前預設高度 : 圖片固定高度)
     */
    defaultImgHeight: {
      type: String,
      default: "100px"
    },
    /**
     * 對推薦項目下樣式
     */
    recommendationStyled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgStatus: IMAGE_STATUS_TYPE.LOADING,
      imgLoadingError: false,
      recommendationStyleEnabled: this.recommendationStyled
    };
  },
  computed: {
    rss() {
      return this.data.source ? this.data.source.rss : {};
    },
    imgLoading() {
      return this.imgStatus === IMAGE_STATUS_TYPE.LOADING;
    },
    thumbnailImgStyle() {
      return {
        height: this.defaultImgHeight,
        backgroundImage: `url(${this.data.img})`
      };
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.b-news-card {
  display: block;
  &:hover {
    cursor: pointer;
  }
  &__body {
    width: 100%;
    background: {
      color: #fafafa;
    }
    border: {
      radius: 16px;
    }
    overflow: hidden;
    border: {
      width: 0.5px;
      style: solid;
      color: #dbdbdb;
    }
  }
  &__thumbnail {
    overflow: hidden;
    position: relative;
    background: {
      color: #eeeeee;
    }
  }
  &__thumbnail-img {
    width: 100%;
    background: {
      size: contain;
      position: center;
      repeat: no-repeat;
    }
    transition: {
      property: height;
      duration: 1s;
      timing-function: ease-in;
    }
  }
  &__info {
    padding: 12px 12.45px;
    display: grid;
    row: {
      gap: 4px;
    }
  }
  &__source {
    font: {
      weight: 400;
      size: 13px;
      weight: 400;
    }
    line: {
      height: 18.2px;
    }
    color: #767676;
  }
  &__title {
    font: {
      weight: bold;
      size: 15px;
    }
    line: {
      height: 21px;
    }
  }
  &_recommendation &__body {
    border: {
      color: #26d07c;
    }
    background: {
      color: #26d07b46;
    }
  }
  &__thumbnail-img_loading {
    animation: {
      duration: 1.5s;
      fill-mode: forwards;
      iteration-count: infinite;
      name: placeload;
      timing-function: linear;
    }
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeload;
    animation-timing-function: linear;
    background: {
      size: 1200px 104px;
      image: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    }
  }
}
</style>
