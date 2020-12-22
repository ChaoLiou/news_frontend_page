<template>
  <div
    class="b-audiovisual"
    @touchstart="startDetectingLongTouch"
    @touchend="stopDetectingLongTouch"
    @touchcancel="stopDetectingLongTouch"
  >
    <div
      class="b-audiovisual__frame"
      ref="frame"
      :style="frameStyle"
      @click="initPlayer"
    >
      <div
        v-if="!playerEnabled"
        class="b-audiovisual__play-icon b-audiovisual__play-icon_center"
      >
        <div></div>
      </div>
      <div :id="id"></div>
    </div>
    <div class="b-audiovisual__menu">
      <div class="b-audiovisual__menu-title">
        <div class="b-audiovisual__title">
          {{ title }}
          <span v-if="longTouch.counter">
            {{ longTouch.duration - longTouch.counter + 1 }}
          </span>
        </div>
        <div v-if="sourceExists" class="b-audiovisual__info">
          <div class="b-audiovisual__datetime">{{ datetime }}</div>
          <div class="b-audiovisual__views">{{ views }}</div>
        </div>
      </div>
      <div
        :class="[
          'b-audiovisual__menu-icon',
          menuToggle ? 'b-audiovisual__menu-icon_toggled' : '',
        ]"
        @click="menuToggle = !menuToggle"
      ></div>
      <div
        v-show="sourceExists && menuToggle"
        class="b-audiovisual__menu-content"
      >
        <div class="b-audiovisual__source">
          <div
            class="b-audiovisual__source-img"
            :style="{ backgroundImage: `url(${data.source.img})` }"
          ></div>
          <div class="b-audiovisual__source-title">{{ data.source.title }}</div>
        </div>
        <div class="b-audiovisual__description" v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script>
function onPlayerStateChange(event) {
  console.log({ onPlayerStateChange: event });
}
import { transformMilliseconds } from "@/news_detail_page/formatter";
import { formatNumber } from "@/assets/js/formatter";
import { replaceNewLineToBr } from "@/assets/js/utils";
export default {
  props: {
    data: {
      type: Object,
      default() {
        return undefined;
      },
    },
  },
  data() {
    return {
      menuToggle: false,
      player: undefined,
      width: 0,
      longTouch: {
        interval: 0,
        duration: 3,
        counter: 0,
      },
    };
  },
  computed: {
    title() {
      return this.sourceExists ? this.data.title : "影片被下架";
    },
    sourceExists() {
      return !!this.data.youtubeId;
    },
    id() {
      return `iframe-${this.data.id}`;
    },
    frameSrc() {
      return `http://www.youtube.com/embed/${this.data.youtubeId}`;
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
      return replaceNewLineToBr(this.data.description);
    },
    imageWidthHeightRate() {
      return this.data.img.height / this.data.img.width;
    },
    frameStyle() {
      return {
        backgroundImage: this.playerEnabled
          ? undefined
          : `url(${this.data.img.url})`,
        height: `calc(${this.width}px * ${this.imageWidthHeightRate})`,
      };
    },
    playerEnabled() {
      return !!this.player;
    },
  },
  mounted() {
    this.width = this.$el.offsetWidth;
  },
  methods: {
    initPlayer() {
      this.player = new YT.Player(this.id, {
        videoId: this.data.youtubeId,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    },
    startDetectingLongTouch() {
      this.longTouch.interval = setInterval(() => {
        if (this.longTouch.counter >= this.longTouch.duration) {
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
  },
};
</script>

<style scoped>
.b-audiovisual {
  background-color: #262626;
}
.b-audiovisual__menu {
  padding: 20px 12px 32px 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1fr 26px;
  column-gap: 6px;
}
.b-audiovisual__title {
  user-select: none;
  color: #ffffff;
  font-size: 15px;
  line-height: 21px;
  font-weight: bold;
}
.b-audiovisual__info {
  display: flex;
  flex-direction: row;
  margin-top: 4px;
}
.b-audiovisual__datetime,
.b-audiovisual__views {
  padding-right: 1em;
  color: #ececec;
  font-weight: 400;
  font-size: 13px;
  line-height: 18.2px;
}
.b-audiovisual__menu-icon {
  width: 26px;
  height: 24px;
  background-image: url("/icons/arrow_down.svg");
}
.b-audiovisual__menu-icon.b-audiovisual__menu-icon_toggled {
  transform: rotateX(180deg);
}
.b-audiovisual__menu-content {
  margin-top: 16px;
}
.b-audiovisual__source {
  display: grid;
  column-gap: 12px;
  grid-template-columns: 30px 1fr;
  align-items: center;
}
.b-audiovisual__source-img {
  width: 30px;
  height: 30px;
  background-size: contain;
  border-radius: 50%;
}
.b-audiovisual__source-title {
  font-size: 13px;
  line-height: 18.2px;
  color: #ffffff;
}
.b-audiovisual__description {
  margin-top: 12px;
  font-size: 13px;
  line-height: 24px;
  color: #ffffff;
  font-weight: 400;
  word-break: break-word;
}
.b-audiovisual__frame {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  width: 100%;
  position: relative;
}
.b-audiovisual__play-icon {
  position: absolute;
  width: fit-content;
  height: fit-content;
  z-index: 2;
}
.b-audiovisual__play-icon > div {
  background-image: url("/icons/btn_play.svg");
  width: 50px;
  height: 50px;
}
.b-audiovisual__play-icon_center {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}
</style>
<style>
.b-audiovisual iframe {
  width: inherit !important;
  height: inherit !important;
}
</style>
