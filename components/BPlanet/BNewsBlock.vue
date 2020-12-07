<template>
  <div class="b-news-block">
    <div class="b-news-block__title" @click="enableVConsole" ref="title">
      {{ titleLabel }}
    </div>
    <div
      class="b-news-block__tags"
      v-if="tags.length > 0"
      :style="stickyStyles"
    >
      <b-horizontal-scroll>
        <b-news-tag
          v-for="(tag, index) in tags"
          :key="index"
          :title-label="tag.title"
          :tagged="tag.tagged"
          @toggle="toggleTag(index)"
        />
      </b-horizontal-scroll>
    </div>
    <div>
      <b-masonry-scroll
        :key="`${planetId}-${this.selectedTag.id}`"
        :loading="loading"
        :items="source"
        ref="masonryScroll"
        @load-more="loadMore"
      >
        <template #default="props">
          <b-news :data="props.item" @navigate="navigate" auto-img-height />
        </template>
        <template #nomore>沒有更多新聞了</template>
      </b-masonry-scroll>
    </div>
  </div>
</template>

<script>
import { planet_click_news } from "@/assets/js/tracking/events";
import { checkAppExist, openFullH5Webview } from "@/assets/js/beanfun";
import { getVendorStageDetailUrl } from "@/assets/js/utils";
const VENDOR_STAGE = process.env.VENDOR_STAGE || { enabled: false };
const RECOMMENDATION_ENABLED = process.env.RECOMMENDATION_ENABLED;

export default {
  props: {
    titleLabel: {
      type: String,
      default: "",
    },
    planetId: {
      type: Number,
      default: 0,
    },
    stickyTop: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tags: [],
      source: [],
      loading: true,
      VENDOR_STAGE,
      theTagOfAll: { title: "全部", id: -1, tagged: true },
    };
  },
  computed: {
    selectedTag() {
      return this.tags.length > 0
        ? this.tags.find((t) => t.tagged)
        : this.theTagOfAll;
    },
    categories() {
      return this.$store.getters["category/list"];
    },
    stickyStyles() {
      if (this.stickyTop) {
        return {
          top: `${this.stickyTop}px`,
          position: "sticky",
          left: "0px",
          zIndex: 99,
        };
      }
    },
  },
  methods: {
    navigate(data) {
      this.$store.dispatch("event/emit", {
        event_id: planet_click_news.id,
        payload: planet_click_news.generatePayload({
          planet_name: data.representativePlanet.name,
          category: data.categories.map((x) => x.name),
          url: data.link,
          title: data.title,
          news_id: data.id,
        }),
      });
      const { session_id, action_index } = this.$store.getters["event/data"];
      let link = `${data.link}?session_id=${session_id}&action_index=${action_index}`;
      const { officialAccountId } = this.$store.getters["serverEnv/env"];
      link = VENDOR_STAGE.enabled
        ? `${location.origin}/${getVendorStageDetailUrl(location.pathname)}`
        : link;
      link += `?planetId=${data.representativePlanet.id}`;
      checkAppExist(
        () => {
          openFullH5Webview(
            link,
            data.representativePlanet.name,
            officialAccountId
          );
        },
        () => {
          window.open(link, "_blank");
        }
      );
    },
    enableVConsole() {
      const vConsoleDOM = document.querySelector("#__vconsole");
      vConsoleDOM.classList.remove("hidden");
    },
    initTags() {
      this.tags = this.categories.map((c) => ({
        title: c.name,
        id: c.id,
        tagged: false,
      }));
      this.tags.unshift(this.theTagOfAll);
    },
    init(planetId) {
      this.source = [];
      this.resetScroll();
      if (planetId) {
        this.tags = [];
        this.$store
          .dispatch("category/fetch", planetId)
          .then(this.initTags)
          .then(this.loadMore);
      } else {
        this.loadMore();
      }
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
    toggleTag(targetIndex) {
      this.tags = this.tags.map((t, i) => ({
        ...t,
        tagged: targetIndex === i,
      }));
      this.init();
    },
    loadMoreNews(list, pageIndex) {
      if (list) {
        if (pageIndex === 1) {
          this.source = [];
        }
        this.source.push(...list);
      }
    },
    loadMore({ pageSize, pageIndex } = { pageSize: 10, pageIndex: 1 }) {
      this.loading = true;
      if (this.selectedTag) {
        const payload = {
          pageIndex,
          pageSize,
        };
        if (this.selectedTag.id === -1) {
          payload.planetId = this.planetId;
          payload.recommendation = RECOMMENDATION_ENABLED && pageIndex === 1;
        } else {
          payload.categoryId = this.selectedTag.id;
        }
        this.$store
          .dispatch("news/fetch", payload)
          .then((list) => this.loadMoreNews(list, pageIndex))
          .then(() => (this.loading = false))
          .catch((_) => (this.loading = false));
      }
    },
  },
  watch: {
    planetId: {
      immediate: true,
      handler(value) {
        this.init(value);
      },
    },
  },
};
</script>

<style scoped>
.b-news-block {
  position: relative;
}
.b-news-block > div:not(:last-child) {
  margin-bottom: 6px;
}
.b-news-block__title {
  font-weight: bold;
  font-size: 17px;
  line-height: 23.8px;
  color: #393939;
  position: relative;
}
.b-news-block__tags {
  margin-right: -12px;
  background-color: white;
}
.b-news-block__tags .b-horizontal-scroll {
  align-items: center;
}
.b-news-block__tags .b-horizontal-scroll > *:not(:last-child) {
  margin-right: 16px;
}
</style>
