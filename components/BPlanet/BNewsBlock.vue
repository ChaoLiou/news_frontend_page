<template>
  <div class="b-news-block">
    <div
      class="b-news-block__tags"
      v-if="tagsData.length > 0"
      :style="stickyStyles"
    >
      <b-horizontal-scroll>
        <div class="b-news-block__title" @click="enableVConsole">
          {{ titleLabel }}
        </div>
        <b-news-tag
          v-for="(tag, index) in tagsData"
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
        :items="arr_source"
        @load-more="loadMore"
        ref="bMasonryScroll"
      >
        <template #default="props">
          <b-news
            :thumbnail="props.item.img"
            :title-label="props.item.title"
            :source="props.item.source"
            :poll="props.item.poll"
            :page-link="props.item.pageLink"
            :link="props.item.link"
            :planet-id="planetId"
          />
        </template>
        <template #nomore>沒有更多新聞了</template>
      </b-masonry-scroll>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleLabel: {
      type: String,
      default: "",
    },
    source: {
      type: Array,
      default() {
        return [];
      },
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
      tagsData: [],
      arr_source: [],
      loading: true,
    };
  },
  computed: {
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
    enableVConsole() {
      new VConsole();
    },
    initCategories() {
      this.tagsData = this.$store.getters["categories/list"].map(
        (c, index) => ({
          title: c.name,
          id: c.id,
          tagged: false,
        })
      );
      this.tagsData.unshift({ title: "全部", id: -1, tagged: true });
    },
    init(updateCategories) {
      this.loading = true;
      this.arr_source = [];
      this.resetScroll();
      if (updateCategories) {
        this.$store
          .dispatch("categories/fetch", this.planetId)
          .then(this.initCategories)
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
      this.tagsData = this.tagsData.map((tag, index) => ({
        ...tag,
        tagged: targetIndex === index,
      }));
      this.init();
    },
    loadMoreNews(list, pageIndex) {
      if (list) {
        if (pageIndex === 1) {
          this.arr_source = [];
        }
        this.arr_source.push(...list);
      }
      this.loading = false;
    },
    loadMore({ pageSize, pageIndex } = { pageSize: 10, pageIndex: 1 }) {
      const selectedTag = this.tagsData.find((t) => t.tagged);
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
        this.loading = true;
        this.$store
          .dispatch("news/fetch", payload)
          .then((list) => this.loadMoreNews(list, pageIndex))
          .catch((err) => {
            console.error(err);
            this.loading = false;
          });
      }
    },
  },
  watch: {
    source: {
      immediate: true,
      handler(value) {
        this.init(true);
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
