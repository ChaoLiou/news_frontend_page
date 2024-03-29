<template>
  <div class="b-news-block">
    <div
      class="b-news-block__title title"
      :class="{ title_placeloader: !titleText }"
      ref="title"
      @touchstart="startDetectingLongTouch"
      @touchend="stopDetectingLongTouch"
      @touchcancel="stopDetectingLongTouch"
      @mousedown="startDetectingLongTouch"
      @mousemove="stopDetectingLongTouch"
      @mouseup="stopDetectingLongTouch"
    >
      <div>{{ titleText }}</div>
      <div class="b-news-block__countdown">
        <span v-if="longTouch.counter">
          {{ longTouch.duration - longTouch.counter + 1 }}
        </span>
      </div>
    </div>
    <div
      class="b-news-block__tags"
      :class="{ 'b-news-block__tags_disabled': this.loading }"
      :style="stickyStyles"
    >
      <b-horizontal-scroll
        :loading="tagsLoading"
        :placeholder-style="{
          height: '30px',
          width: '50px',
          marginRight: '16px',
          borderRadius: '10px'
        }"
      >
        <b-news-tag
          v-for="(tag, index) in tags"
          :key="index"
          :title-text="tag.title"
          :selected="tag.selected"
          @toggle="toggleTag(index)"
        />
      </b-horizontal-scroll>
    </div>
    <div>
      <b-masonry-scroll
        :key="`${planetId}-${this.selectedTag.id}`"
        :loading="loading"
        :source="source"
        :triggerable-predicate="x => !x.recommendation"
        ref="masonryScroll"
        :placeholder-style="{
          borderRadius: '20px'
        }"
        :page-size="20"
        @load-more="loadMore"
      >
        <template #default="props">
          <b-news-card
            :data="props.item"
            :recommendation-styled="recommendationStyled"
            @navigate="navigate"
          />
        </template>
        <template #nomore>沒有更多新聞了</template>
      </b-masonry-scroll>
    </div>
  </div>
</template>

<script>
import {
  click_news,
  impression_landing_page,
  click_news_category,
  BLOCK_TYPE
} from "./../../assets/js/tracking/events";
import {
  checkAppExistAsync,
  openFullH5WebviewAsync
} from "./../../assets/js/beango/index.async";
import { getSupplierDetailUrl, showVConsole } from "./../../assets/js/utils";
import BNewsCard from "./BNewsBlock/BNewsCard";
import BNewsTag from "./BNewsBlock/BNewsTag";
import BHorizontalScroll from "./../shared/BHorizontalScroll";
import BMasonryScroll from "./../shared/BMasonryScroll";
import { trackEvent } from "./../../assets/js/tracking";
const SUPPLIER = process.env.SUPPLIER || {};
const RECOMMENDATION_ENABLED = process.env.RECOMMENDATION_ENABLED || {};
/**
 * 新聞區塊
 */
export default {
  components: {
    BNewsCard,
    BNewsTag,
    BHorizontalScroll,
    BMasonryScroll
  },
  props: {
    /**
     * 標題文字
     */
    titleText: {
      type: String,
      default: ""
    },
    /**
     * 星球 Id
     */
    planetId: {
      type: [Number, String],
      default: -1
    },
    /**
     * 設定標題需要 sticky 在 top 多少的位置
     */
    stickyTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tags: [],
      source: [],
      loading: true,
      tagsLoading: true,
      SUPPLIER,
      theTagOfAll: {
        title: RECOMMENDATION_ENABLED.news ? "專屬你的" : "全部",
        id: -1,
        selected: true
      },
      longTouch: {
        interval: 0,
        duration: 2,
        counter: 0
      },
      recommendationStyled: RECOMMENDATION_ENABLED.styled
    };
  },
  computed: {
    selectedTag() {
      return this.tags.length > 0
        ? this.tags.find(t => t.selected)
        : this.theTagOfAll;
    },
    categories() {
      return this.$store.getters["category/list"];
    },
    stickyStyles() {
      return {
        top: `${this.stickyTop}px`,
        position: "sticky",
        left: "0px",
        zIndex: 99
      };
    }
  },
  methods: {
    triggerLongTouch() {
      showVConsole();
    },
    startDetectingLongTouch() {
      this.longTouch.interval = setInterval(() => {
        if (this.longTouch.counter >= this.longTouch.duration) {
          /**
           * 長按 2 秒
           */
          this.triggerLongTouch();
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
    async navigate(data) {
      const categoryNames = data.categories.map(x => x.name);
      await trackEvent(
        click_news.id,
        click_news.category,
        click_news.action,
        click_news.formatPayload(
          data.representativePlanet.name,
          categoryNames,
          data.link,
          data.title,
          data.id,
          data.index,
          data.source.site.id,
          data.source.site.name,
          data.source.rss.id,
          data.source.rss.name
        )
      );
      let link = data.link;
      link = SUPPLIER.enabled
        ? `${location.origin}/${getSupplierDetailUrl(link)}`
        : link;
      link += `?planetId=${
        data.representativePlanet.id
      }&${location.search.substr(1)}`;
      if (await checkAppExistAsync()) {
        await openFullH5WebviewAsync(
          link,
          this.planetName,
          this.serverEnv.BgoOfficialAccountId
        );
      } else {
        window.open(link, "_blank");
      }
    },
    initTags() {
      this.tags = this.categories.map(c => ({
        title: c.name,
        id: c.id,
        selected: false
      }));
      this.tags.unshift(this.theTagOfAll);
      this.tagsLoading = false;
    },
    async init(planetId) {
      this.source = [];
      this.resetScroll();
      if (planetId >= 0) {
        this.tagsLoading = true;
        this.tags = [];
        await this.$store.dispatch("category/fetch", planetId);
        this.initTags();
      }
      await this.loadMore();
    },
    resetScroll() {
      if (this.$refs.masonryScroll) {
        this.$refs.masonryScroll.reset();
        const top = this.$el.offsetTop;
        const styles = window.getComputedStyle(this.$el);
        const paddingTop = parseFloat(styles["paddingTop"]);
        const scrollY = top - paddingTop;
        window.scroll(0, scrollY);
      }
    },
    async toggleTag(targetIndex) {
      if (!this.loading && this.selectedTag.index !== targetIndex) {
        this.source = [];
        this.tags = this.tags.map((t, i) => ({
          ...t,
          selected: targetIndex === i
        }));
        await trackEvent(
          click_news_category.id,
          click_news_category.category,
          click_news_category.action,
          click_news_category.formatPayload(
            this.planetName,
            this.selectedTag.title,
            targetIndex
          )
        );
        await this.init();
      }
    },
    loadMoreNews(list, pageIndex) {
      if (list) {
        if (pageIndex === 1) {
          this.source = [];
        }
        this.source.push(...list);
      }
    },
    async loadMore({ pageSize, pageIndex } = { pageSize: 20, pageIndex: 1 }) {
      this.loading = true;
      if (this.planetId >= 0 && this.selectedTag) {
        const payload = {
          pageIndex,
          pageSize
        };
        if (this.selectedTag.id === -1) {
          payload.planetId = this.planetId;
          payload.recommendation =
            RECOMMENDATION_ENABLED.news && pageIndex === 1;
        } else {
          payload.categoryId = this.selectedTag.id;
        }
        const list = await this.$store.dispatch("news/fetch", payload);
        this.loadMoreNews(list, pageIndex);

        const newsList = list.map((x, index) => ({
          id: x.id,
          siteId: x.source.site.id,
          siteName: x.source.site.name,
          rssId: x.source.rss.id,
          rssName: x.source.rss.name,
          blockType: BLOCK_TYPE.NEWS,
          planetName: this.planetName,
          categoryName: this.selectedTag.title,
          index
        }));
        await trackEvent(
          impression_landing_page.id,
          impression_landing_page.category,
          impression_landing_page.action,
          impression_landing_page.formatPayload(newsList)
        );
        this.loading = false;
      }
    }
  },
  watch: {
    planetId: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.init(value);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.b-news-block {
  position: relative;
  & > div:not(:last-child) {
    margin-bottom: 6px;
  }
  &__title {
    user-select: none;
    font-weight: bold;
    font-size: 17px;
    line-height: 23.8px;
    color: #393939;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1em;
  }
  &__tags {
    margin-right: -12px;
    background-color: #ffffff;
    .b-horizontal-scroll {
      align-items: center;
      > *:not(:last-child) {
        margin-right: 16px;
      }
    }
  }
}
.title_placeloader {
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
