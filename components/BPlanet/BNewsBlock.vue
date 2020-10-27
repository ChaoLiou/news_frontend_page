<template>
  <div class="b-news-block">
    <div
      class="b-news-block__tags"
      v-if="tags.length > 0"
      :style="stickyStyles"
    >
      <b-horizontal-scroll fade-out>
        <div class="b-news-block__title" @click="enableVConsole">
          {{ titleLabel }}
        </div>
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
        :loading="loading"
        :items="source"
        @load-more="loadMore"
        ref="bMasonryScroll"
      >
        <template #default="props">
          <b-news :data="props.item" @navigate="navigate" />
        </template>
        <template #nomore>沒有更多新聞了</template>
      </b-masonry-scroll>
    </div>
  </div>
</template>

<script>
import { planet_click_news } from "@/assets/js/tracking/events";
import { getPlanetName } from "@/assets/js/tracking/mapping";
import { openFullH5Webview } from "@/assets/js/beanfun";

export default {
  props: {
    vendorStageEnv: {
      type: Object,
      default() {
        return {
          enabled: false,
          newsDetailRelativeUrl: "",
        };
      },
    },
    titleLabel: {
      type: String,
      default: "",
    },
    planetId: {
      type: Number,
      default: 0,
    },
    stickyTop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tags: [],
      source: [],
      loading: true,
    };
  },
  computed: {
    categories() {
      return this.$store.getters["category/list"];
    },
    planet() {
      return this.$store.getters["planet/find"](this.planetId);
    },
    planetTitle() {
      return this.planet ? this.planet.name : "";
    },
    stickyStyles() {
      if (this.stickyTop) {
        return {
          top: this.stickyTop,
          position: "sticky",
          left: "0px",
          zIndex: 2,
        };
      }
    },
  },
  methods: {
    navigate(data) {
      this.$store.dispatch("event/emit", {
        event_id: planet_click_news.id,
        payload: planet_click_news.generatePayload({
          planet_name: getPlanetName(this.planetId),
          category: data.categories,
          url: data.link,
          title: data.title,
          news_id: data.id,
        }),
      });
      const { session_id, action_index } = this.$store.getters["event/data"];
      const link = `${data.link}?session_id=${session_id}&action_index=${action_index}`;
      const { officialAccountId } = this.$store.getters["serverEnv/env"];
      openFullH5Webview(
        this.vendorStageEnv.enabled
          ? location.origin + "/" + this.vendorStageEnv.newsDetailRelativeUrl
          : link,
        this.planetTitle,
        officialAccountId
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
      this.tags.unshift({ title: "全部", id: -1, tagged: true });
    },
    init(planetId) {
      this.loading = true;
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
      if (this.$refs.bMasonryScroll) {
        this.$refs.bMasonryScroll.reset();
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
      const selectedTag = this.tags.find((t) => t.tagged);
      if (selectedTag) {
        const payload = {
          pageIndex,
          pageSize,
        };
        if (selectedTag.id === -1) {
          payload.planetId = this.planetId;
        } else {
          payload.categoryId = selectedTag.id;
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
  font-size: 1.25em;
  position: relative;
}
.b-news-block__tags {
  margin-right: -12px;
  background-color: white;
}
.b-news-block__tags .b-horizontal-scroll {
  height: 44px;
  align-items: center;
}
.b-news-block__tags .b-horizontal-scroll > *:not(:last-child) {
  margin-right: 12px;
}
</style>
