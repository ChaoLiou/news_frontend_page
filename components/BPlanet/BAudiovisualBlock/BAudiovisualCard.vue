<template>
  <div
    class="b-audiovisual-card"
    :style="{ width, minWidth: width, height, minHeight: height }"
    @click="navigate"
  >
    <div class="b-audiovisual-card__thumbnail">
      <div
        class="b-audiovisual-card__thumbnail-img"
        :style="thumbnailImgStyle"
      ></div>
      <b-play-icon
        class="b-audiovisual-card__play-icon b-audiovisual-card__play-icon_center"
      />
      <div v-if="data.marked" class="b-audiovisual-card__marker marker">
        <b-flame-icon class="marker__icon" />
        <div class="marker__text">熱門</div>
      </div>
      <div class="b-audiovisual-card__info">
        <div class="b-audiovisual-card__views">{{ views }}</div>
        <div class="b-audiovisual-card__title">{{ data.title }}</div>
        <div class="b-audiovisual-card__source">{{ site.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNumber } from "./../../../assets/js/formatter";
import VueTypes from "vue-types";
import BPlayIcon from "./../../shared/icons/BPlayIcon";
/**
 * 影音卡片
 */
export default {
  components: {
    BPlayIcon
  },
  props: {
    data: VueTypes.shape({
      id: VueTypes.string, // 影音 Id
      videoId: VueTypes.string, // 原站台的 Video Id
      title: VueTypes.string, // 影音標題
      datetime: VueTypes.instanceOf(Date), // 影音上傳時間
      views: VueTypes.string, // 影音觀看數
      description: VueTypes.string, // 影音描述
      planets: VueTypes.arrayOf(
        VueTypes.shape({
          id: VueTypes.number, // 影音所屬星球 - 星球 Id
          name: VueTypes.string // 影音所屬星球 - 星球名稱
        })
      ),
      representativePlanet: VueTypes.shape({
        name: VueTypes.string // 影音所屬星球中的代表星球 - 星球名稱
      }),
      representativeCategory: VueTypes.shape({
        name: VueTypes.string, // 影音所屬星球中第一個分類 - 名稱
        id: VueTypes.number // 影音所屬星球中第一個分類 - 分類 Id
      }),
      categories: VueTypes.arrayOf(
        VueTypes.shape({
          name: VueTypes.string // 影音所屬分類 - 分類名稱
        })
      ),
      img: VueTypes.shape({
        url: VueTypes.string, // 影音預覽圖 - 網址
        width: VueTypes.number, // 影音預覽圖 - 寬
        height: VueTypes.number // 影音預覽圖 - 高
      }),
      source: VueTypes.shape({
        rss: VueTypes.shape({
          id: VueTypes.number, // 影音來源 - RSS Id
          name: VueTypes.string // 影音來源 - RSS 名稱
        }),
        site: VueTypes.shape({
          id: VueTypes.number, // 影音來源 - 站台 Id
          name: VueTypes.string, // 影音來源 - 站台名稱
          img: VueTypes.string // 影音來源 - 圖片
        })
      }),
      index: VueTypes.integer, // 影音 index
      marked: VueTypes.bool // 影音 已標記
    }),
    /**
     * 影音卡片 - 寬(css width)
     */
    width: {
      type: String,
      default: "300px"
    },
    /**
     * 影音卡片 - 高(css height)
     */
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      observer: undefined
    };
  },
  computed: {
    site() {
      return this.data.source ? this.data.source.site : {};
    },
    planetId() {
      return this.data.planets.length > 0 ? this.data.planets[0].id : undefined;
    },
    views() {
      return `${this.data.views ? formatNumber(this.data.views) : 0}次觀看`;
    },
    thumbnailImgStyle() {
      return {
        backgroundImage: `url(${this.data.img.url})`
      };
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handler, {
      root: null,
      threshold: 0
    });
    this.observer.observe(this.$el);
  },
  methods: {
    handler(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /**
           * 影音卡片出現於 viewport
           * @property {Object} data 影音資料, 結構如同 data property
           */
          this.$emit("show-up", this.data);
        }
      });
    },
    navigate() {
      /**
       * 點擊影音卡片
       * @property {Object} data 影音資料, 結構如同 data property
       */
      this.$emit("navigate", this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.b-audiovisual-card {
  display: block;
  border-radius: 16px;
  overflow: hidden;
  border: 0.5px solid #dbdbdb;
  &:hover {
    cursor: pointer;
  }
  &__thumbnail {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &__thumbnail-img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    z-index: 1;
  }
  &__play-icon {
    position: absolute;
    width: fit-content;
    height: fit-content;
    z-index: 2;
  }
  &__marker {
    display: flex;
    flex-direction: row;
    top: 24px;
    left: 0px;
    position: absolute;
    z-index: 3;
    background-color: #ff9500;
    color: white;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  &__play-icon > div {
    width: 50px;
    height: 50px;
  }
  &__play-icon_center {
    left: 50%;
    transform: translate(-50%, -50%);
    top: calc(50% - 44px);
  }
  &__info {
    position: absolute;
    z-index: 2;
    bottom: 0px;
    background-color: #262626;
    padding: 12px;
    display: grid;
    row-gap: 4px;
    width: calc(100% - 24px);
  }
  &__views {
    color: #26d07c;
    font-weight: 400;
    font-size: 13px;
    line-height: 18.2px;
  }
  &__title {
    color: #ffffff;
    font-weight: 500;
    font-size: 15px;
    line-height: 21px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__source {
    font-weight: 400;
    font-size: 13px;
    line-height: 18.2px;
    color: #d3d3d3;
  }
}
.marker__icon {
  padding: 6px 0px 6px 7px;
}
.marker__text {
  color: white;
  font-size: 13px;
  padding: 5px 6px 5px 2px;
}
</style>
