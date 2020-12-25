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
      <div class="b-audiovisual-card__info">
        <div class="b-audiovisual-card__views">{{ views }}</div>
        <div class="b-audiovisual-card__title">{{ data.title }}</div>
        <div class="b-audiovisual-card__source">{{ data.source.title }}</div>
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
    BPlayIcon,
  },
  props: {
    data: VueTypes.shape({
      id: VueTypes.string, // 影音 Id
      youtubeId: VueTypes.string, // Youtube Id
      title: VueTypes.string, // 影音標題
      datetime: VueTypes.instanceOf(Date), // 影音上傳時間
      views: VueTypes.string, // 影音觀看數
      description: VueTypes.string, // 影音描述
      planets: VueTypes.arrayOf(
        VueTypes.shape({
          id: VueTypes.number, // 影音所屬星球 - 星球 Id
        })
      ),
      representativePlanet: VueTypes.shape({
        name: VueTypes.string, // 影音所屬星球中的代表星球 - 星球名稱
      }),
      img: VueTypes.shape({
        url: VueTypes.string, // 影音預覽圖 - 網址
        width: VueTypes.number, // 影音預覽圖 - 寬
        height: VueTypes.number, // 影音預覽圖 - 高
      }),
      source: VueTypes.shape({
        title: VueTypes.string, // 影音來源 - 標題
        img: VueTypes.string, // 影音來源 - 圖片
      }),
      index: VueTypes.integer, // 影音 index
    }),
    /**
     * 影音卡片 - 寬(css width)
     */
    width: {
      type: String,
      default: "300px",
    },
    /**
     * 影音卡片 - 高(css height)
     */
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      observer: undefined,
    };
  },
  computed: {
    planetId() {
      return this.data.planets.length > 0 ? this.data.planets[0].id : undefined;
    },
    views() {
      return `${formatNumber(this.data.views)}次觀看`;
    },
    thumbnailImgStyle() {
      return {
        backgroundImage: `url(${this.data.img.url})`,
      };
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handler, {
      root: null,
      threshold: 0,
    });
    this.observer.observe(this.$el);
  },
  methods: {
    handler(entries, observer) {
      entries.forEach((entry) => {
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
    },
  },
};
</script>

<style scoped>
.b-audiovisual-card {
  display: block;
  border-radius: 16px;
  overflow: hidden;
  border: 0.5px solid #dbdbdb;
}
.b-audiovisual-card:hover {
  cursor: pointer;
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
.b-audiovisual-card__views {
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
