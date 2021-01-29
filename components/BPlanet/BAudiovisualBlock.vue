<template>
  <div
    class="b-audiovisual-block"
    :class="{ 'b-audiovisual-block_masonry': vertical }"
  >
    <div
      class="b-audiovisual-block__title title"
      :class="{ title_placeholder: !titleText }"
    >
      <div>{{ titleText }}</div>
    </div>
    <div>
      <b-masonry-grid
        v-if="vertical"
        :source="source"
        :column="1"
        :auto-height="false"
        ref="bMasonryScroll"
        @load-more="loadMore"
      >
        <template #default="props">
          <b-audiovisual-player
            :data="props.item"
            @long-touch="showVConsole"
            @start-playing="startPlayingAudiovisual"
          />
        </template>
        <template #nomore>
          <div class="no-more-content">沒有更多影片了</div>
        </template>
      </b-masonry-grid>
      <b-horizontal-scroll
        v-else
        :loading="loading"
        :placeholder-style="{
          height: '230px',
          width: '320px',
          marginRight: '16px',
          borderRadius: '20px',
        }"
        @scroll-end="horizontalOnScrollEnd"
      >
        <template v-for="(item, index) in source">
          <b-audiovisual-card
            :key="index"
            :data="{ ...item, index }"
            height="228px"
            width="320px"
            @navigate="navigate"
            @show-up="(data) => (currentLastItem = data)"
          />
        </template>
      </b-horizontal-scroll>
    </div>
  </div>
</template>

<script>
import {
  checkAppExistAsync,
  openFullH5WebviewAsync,
} from "./../../assets/js/beango/index.async";
import { showVConsole, getHashModeOrigin } from "./../../assets/js/utils";
import {
  click_video,
  impression_video_page,
  impression_landing_page,
  click_video_play,
  BLOCK_TYPE,
  swipe_banner,
} from "./../../assets/js/tracking/events";
import { trackEvent } from "./../../assets/js/tracking";
import BAudiovisualPlayer from "./BAudiovisualBlock/BAudiovisualPlayer";
import BAudiovisualCard from "./BAudiovisualBlock/BAudiovisualCard";
import BHorizontalScroll from "./../shared/BHorizontalScroll";
import BMasonryGrid from "./../shared/BMasonryGrid";
/**
 * 影音區塊
 */
export default {
  components: {
    BAudiovisualPlayer,
    BAudiovisualCard,
    BHorizontalScroll,
    BMasonryGrid,
  },
  props: {
    /**
     * 標題文字
     */
    titleText: {
      type: String,
      default: "",
    },
    /**
     * 垂直 / 水平排版
     */
    vertical: {
      type: Boolean,
      default: false,
    },
    /**
     * 星球 Id
     */
    planetId: {
      type: [Number, String],
      default: -1,
    },
    /**
     * 置頂的影音 Id
     */
    topPriorityId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      source: [],
      loading: false,
      currentLastItem: undefined,
    };
  },
  methods: {
    showVConsole,
    init() {
      this.loading = true;
      this.source = [];
      this.resetScroll();
      this.loadMore();
    },
    resetScroll() {
      if (this.$refs.bMasonryScroll) {
        this.$refs.bMasonryScroll.reset();
      }
    },
    loadMoreVideo(list, pageIndex) {
      if (Array.isArray(list) && list.length > 0) {
        const isFirstPage = pageIndex === 1;
        if (isFirstPage && this.topPriorityId) {
          const isTopPriority = (id) => id === this.topPriorityId;
          const topPriorityItem = list.find((x) => isTopPriority(x.id));
          const listExcludeTopPriorityItem = list.filter(
            (x) => !isTopPriority(x.id)
          );
          this.source.push(topPriorityItem);
          this.source.push(...listExcludeTopPriorityItem);
        } else {
          this.source.push(...list);
        }
      }
    },
    async loadMore({ pageSize, pageIndex } = { pageSize: 10, pageIndex: 1 }) {
      this.loading = true;
      if (this.planetId >= 0) {
        const payload = {
          pageIndex,
          pageSize,
          planetId: this.planetId,
        };
        const list = await this.$store.dispatch("audiovisual/fetch", payload);
        this.loadMoreVideo(list, pageIndex);
        const videos = list.map((x) => ({
          id: x.id,
          siteId: x.source.site.id,
          siteName: x.source.site.name,
          rssId: x.source.rss.id,
          rssName: x.source.rss.name,
          blockType: BLOCK_TYPE.VIDEO,
          planetName: this.planetName,
        }));
        if (this.vertical) {
          await trackEvent(
            impression_video_page.id,
            impression_video_page.category,
            impression_video_page.action,
            impression_video_page.formatPayload(videos)
          );
        } else {
          await trackEvent(
            impression_landing_page.id,
            impression_landing_page.category,
            impression_landing_page.action,
            impression_landing_page.formatPayload(videos)
          );
        }
        this.loading = false;
      }
    },
    async navigate(data) {
      await trackEvent(
        click_video.id,
        click_video.category,
        click_video.action,
        click_video.formatPayload(
          data.id,
          data.index,
          data.source.site.id,
          data.source.site.name,
          data.source.rss.id,
          data.source.rss.name
        )
      );
      const origin = getHashModeOrigin(this.$router);
      const link = `${origin}/${this.planetId}/audiovisual/${data.id}`;
      if (await checkAppExistAsync()) {
        await openFullH5WebviewAsync(
          link,
          data.representativePlanet.name,
          this.serverEnv.officialAccountId
        );
      } else {
        window.open(link, "_blank");
      }
    },
    async startPlayingAudiovisual(data) {
      await trackEvent(
        click_video_play.id,
        click_video_play.category,
        click_video_play.action,
        click_video_play.formatPayload(
          data.id,
          data.source.site.id,
          data.source.site.name,
          data.source.rss.id,
          data.source.rss.name
        )
      );
    },
    async horizontalOnScrollEnd() {
      // [deprecated] track swipe_banner
    },
  },
  watch: {
    planetId: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
};
</script>

<style scoped>
.b-audiovisual-block__title {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 1.25em;
  position: relative;
  margin-bottom: 10px;
}
.b-horizontal-scroll > *:not(:last-child) {
  margin-right: 16px;
}
.no-more-content {
  width: 100%;
  background-color: #262626;
  color: #ffffff;
  text-align: center;
}
.b-audiovisual-block_masonry {
  background-color: #262626;
}
.b-masonry-grid {
  min-height: 100vh;
}
.title_placeholder {
  width: 6em;
  height: 1.25em;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeload;
  animation-timing-function: linear;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 104px;
}
</style>
