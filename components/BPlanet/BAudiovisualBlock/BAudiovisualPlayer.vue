<template>
  <div class="b-audiovisual-player">
    <div
      class="b-audiovisual-player__frame"
      ref="frame"
      :style="frameStyle"
      @click="initYTPlayer"
    >
      <b-play-icon
        v-if="!playerEnabled"
        class="b-audiovisual-player__play-icon b-audiovisual-player__play-icon_center"
      />
      <div :id="id"></div>
    </div>
    <div class="b-audiovisual-player__menu">
      <div
        class="b-audiovisual-player__menu-title"
        @touchstart="startDetectingLongTouch"
        @touchend="stopDetectingLongTouch"
        @touchcancel="stopDetectingLongTouch"
        @mousedown="startDetectingLongTouch"
        @mousemove="stopDetectingLongTouch"
        @mouseup="stopDetectingLongTouch"
      >
        <div class="b-audiovisual-player__title">
          {{ title }}
        </div>
        <div v-if="sourceExists" class="b-audiovisual-player__info">
          <div class="b-audiovisual-player__datetime">{{ datetime }}</div>
          <div class="b-audiovisual-player__views">{{ views }}</div>
        </div>
      </div>
      <div>
        <div
          class="b-audiovisual-player__menu-icon"
          :class="{
            'b-audiovisual-player__menu-icon_toggled': menuToggle,
          }"
          @click="menuToggle = !menuToggle"
        >
          <b-arrow-icon />
        </div>
        <div class="b-audiovisual-player__countdown">
          <span v-if="longTouch.counter">
            {{ longTouch.duration - longTouch.counter + 1 }}
          </span>
        </div>
      </div>
      <div
        v-show="sourceExists && menuToggle"
        class="b-audiovisual-player__menu-content"
      >
        <div v-if="data.source" class="b-audiovisual-player__source">
          <div
            class="b-audiovisual-player__source-img"
            :style="{ backgroundImage: `url(${site.img})` }"
          ></div>
          <div class="b-audiovisual-player__source-title">
            {{ site.name }}
          </div>
        </div>
        <div
          class="b-audiovisual-player__description"
          v-html="description"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { transformMilliseconds } from "./../../../news_detail_page/formatter";
import { formatNumber } from "./../../../assets/js/formatter";
import { replaceNewLineToBr } from "./../../../assets/js/utils";
import { createElement } from "./../../../news_detail_page/render";
import VueTypes from "vue-types";
import BArrowIcon from "./../../../components/shared/icons/BArrowIcon";
/**
 * 影音播放器
 */
export default {
  components: { BArrowIcon },
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
          name: VueTypes.string, // 影音所屬星球 - 星球名稱
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
        rss: VueTypes.shape({
          id: VueTypes.number, // 影音來源 - RSS Id
          name: VueTypes.string, // 影音來源 - RSS 名稱
        }),
        site: VueTypes.shape({
          id: VueTypes.number, // 影音來源 - 站台 Id
          name: VueTypes.string, // 影音來源 - 站台名稱
          img: VueTypes.string, // 影音來源 - 圖片
        }),
      }),
      index: VueTypes.integer, // 影音 index
    }),
  },
  data() {
    return {
      menuToggle: false,
      player: undefined,
      width: 0,
      longTouch: {
        interval: 0,
        duration: 2,
        counter: 0,
      },
      played: false,
    };
  },
  computed: {
    site() {
      return this.data.source ? this.data.source.site : {};
    },
    sourceExists() {
      return !!this.data.videoId;
    },
    title() {
      return this.sourceExists ? this.data.title : "影片被下架";
    },
    id() {
      return `iframe-${this.data.id}`;
    },
    frameSrc() {
      return `http://www.youtube.com/embed/${this.data.videoId}`;
    },
    datetime() {
      return transformMilliseconds(this.data.datetime);
    },
    views() {
      const formattedViews = formatNumber(this.data.views, {
        digit: 4,
        unit: "萬",
      });
      return `觀看次數：${formattedViews}次`;
    },
    description() {
      return this.data.description
        ? replaceNewLineToBr(this.data.description)
        : "";
    },
    imgWHRate() {
      return this.data.img
        ? this.data.img.height / this.data.img.width
        : 9 / 16;
    },
    frameStyle() {
      return {
        backgroundImage: this.playerEnabled
          ? undefined
          : `url(${this.data.img.url})`,
        height: `calc(${this.width}px * ${this.imgWHRate})`,
      };
    },
    playerEnabled() {
      return !!this.player;
    },
  },
  mounted() {
    this.width = this.$el.offsetWidth;
    if (typeof YT !== "undefined") {
    } else {
      const scriptDOM = createElement("script", {
        src: "https://www.youtube.com/iframe_api",
      });
      document.body.append(scriptDOM);
    }
  },
  methods: {
    initYTPlayer() {
      this.player = new YT.Player(this.id, {
        videoId: this.data.videoId,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        },
      });
    },
    startDetectingLongTouch() {
      this.longTouch.interval = setInterval(() => {
        if (this.longTouch.counter >= this.longTouch.duration) {
          /**
           * 長按 2 秒
           */
          this.$emit("long-touch");
          this.stopDetectingLongTouch();
        } else {
          this.longTouch.counter++;
        }
      }, 1000);
    },
    stopDetectingLongTouch() {
      clearInterval(this.longTouch.interval);
      this.longTouch.interval = 0;
      this.longTouch.counter = 0;
    },
    onPlayerReady(event) {
      event.target.playVideo();
    },
    onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !this.played) {
        /**
         * 影音開始播放
         * @property {Object} data 影音資料, 結構如同 data property
         */
        this.$emit("start-playing", this.data);
        this.played = true;
      }
    },
  },
};
</script>

<style scoped>
.b-audiovisual-player {
  background-color: #262626;
}
.b-audiovisual-player__menu {
  padding: 20px 12px 32px 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1fr 26px;
  column-gap: 6px;
}
.b-audiovisual-player__title {
  user-select: none;
  color: #ffffff;
  font-size: 15px;
  line-height: 21px;
  font-weight: bold;
  cursor: pointer;
}
.b-audiovisual-player__info {
  display: flex;
  flex-direction: row;
  margin-top: 4px;
}
.b-audiovisual-player__datetime,
.b-audiovisual-player__views {
  padding-right: 1em;
  color: #ececec;
  font-weight: 400;
  font-size: 13px;
  line-height: 18.2px;
}
.b-audiovisual-player__menu-icon {
  cursor: pointer;
  width: 26px;
  height: 24px;
  color: #ffffff;
}
.b-audiovisual-player__menu-icon.b-audiovisual-player__menu-icon_toggled {
  transform: rotateX(180deg);
}
.b-audiovisual-player__menu-content {
  margin-top: 16px;
}
.b-audiovisual-player__source {
  display: grid;
  column-gap: 12px;
  grid-template-columns: 30px 1fr;
  align-items: center;
}
.b-audiovisual-player__source-img {
  width: 30px;
  height: 30px;
  background-size: contain;
  border-radius: 50%;
}
.b-audiovisual-player__source-title {
  font-size: 13px;
  line-height: 18.2px;
  color: #ffffff;
}
.b-audiovisual-player__description {
  margin-top: 12px;
  font-size: 13px;
  line-height: 24px;
  color: #ffffff;
  font-weight: 400;
  word-break: break-word;
}
.b-audiovisual-player__frame {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  width: 100%;
  position: relative;
}
.b-audiovisual-player__play-icon {
  position: absolute;
  width: fit-content;
  height: fit-content;
  z-index: 2;
}
.b-audiovisual-player__play-icon > div {
  width: 50px;
  height: 50px;
}
.b-audiovisual-player__play-icon_center {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}
.b-audiovisual-player__countdown {
  color: #ffffff;
  text-align: center;
}
</style>
<style>
.b-audiovisual-player iframe {
  width: inherit !important;
  height: inherit !important;
}
</style>
