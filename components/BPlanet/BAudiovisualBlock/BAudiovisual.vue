<template>
  <div class="b-audiovisual">
    <div :id="id" :style="frameStyle"></div>
    <div class="b-audiovisual__menu">
      <div class="b-audiovisual__menu-title">
        <div class="b-audiovisual__title">
          {{ data.title }}
        </div>
        <div class="b-audiovisual__info">
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
      <div v-show="menuToggle" class="b-audiovisual__menu-content">
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
function onPlayerReady(event) {
  console.log({ onPlayerReady: event });
}
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
    };
  },
  computed: {
    id() {
      return `iframe-${this.data.id}`;
    },
    frameSrc() {
      return `http://www.youtube.com/embed/${this.youtubeId}`;
    },
    youtubeId() {
      const result = /\?v=(.*?)$/.exec(this.data.link);
      if (result) {
        const [_, id] = result;
        return id;
      }
    },
    datetime() {
      return transformMilliseconds(this.data.datetime);
    },
    views() {
      return `觀看次數：${formatNumber(this.data.views, {
        digit: 4,
        unit: "萬",
      })}次`;
    },
    description() {
      return replaceNewLineToBr(this.data.description);
    },
    frameStyle() {
      return {
        width: "100vw",
        height: `calc(100vw * ${this.data.img.height} / ${this.data.img.width})`,
      };
    },
  },
  mounted() {
    this.player = new YT.Player(this.id, {
      // width: this.data.img.width,
      // height: this.data.img.height,
      videoId: this.youtubeId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
      // playerVars: {
      //   autoplay: [0, 1],
      //   cc_lang_pref: "",
      //   cc_load_policy: [0, 1],
      //   color: "",
      //   controls: [0, 1],
      //   disablekb: [0, 1],
      //   enablejsapi: [0, 1],
      //   end: "",
      //   fs: [0, 1],
      //   hl: "",
      //   iv_load_policy: [0, 1],
      //   list: "",
      //   listType: ["playlist", "user_uploads"],
      //   loop: [0, 1],
      //   modestbranding: [0, 1],
      //   origin: "",
      //   playlist: "",
      //   playsinline: [0, 1],
      //   rel: [0, 1],
      //   start: "",
      //   widget_referrer: "",
      // },
    });
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
}
iframe {
  width: 100%;
  height: 100%;
}
</style>
