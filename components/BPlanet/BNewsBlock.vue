<template>
  <div class="b-news-block">
    <div class="b-news-block__tags" v-if="tagsData.length > 0" :style="stickyStyles">
      <b-horizontal-scroll>
        <div class="b-news-block__title">{{ titleLabel }}</div>
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
        <template v-slot:default="props">
          <b-news
            :thumbnail="props.item.img"
            :title-label="props.item.title"
            :source="props.item.source"
            :poll="props.item.poll"
            :pageLink="props.item.pageLink"
            :link="props.item.link"
          />
        </template>
      </b-masonry-scroll>
    </div>
  </div>
</template>

<script>
import BHorizontalScroll from "@/components/shared/BHorizontalScroll.vue";
import BMasonryScroll from "@/components/shared/BMasonryScroll.vue";
import BNews from "@/components/BPlanet/BNewsBlock/BNews.vue";
import BNewsTag from "@/components/BPlanet/BNewsBlock/BNewsTag.vue";
export default {
  components: {
    BHorizontalScroll,
    BMasonryScroll,
    BNews,
    BNewsTag,
  },
  props: {
    titleLabel: {
      type: String,
      default: "推薦更多文章、影片",
    },
    source: {
      type: Array,
      default() {
        return [];
      },
    },
    planetId: {
      type: Number,
      default: 1,
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
      loading: false,
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
    init(updateCategories) {
      this.arr_source = [];
      this.resetScroll();
      this.$store.commit("token/renew");
      if (updateCategories) {
        this.getNewsCategories(this.planetId).then((categories) => {
          this.tagsData = categories.map((c, index) => ({
            title: c.name,
            id: c.id,
            tagged: index ? false : true,
          }));
          this.loadMore();
        });
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
    loadMore({ pageSize, pageIndex } = { pageSize: 10, pageIndex: 1 }) {
      const selectedTag = this.tagsData.find((t) => t.tagged);
      if (selectedTag) {
        this.loading = true;
        this.getNews({
          page: pageIndex,
          pageSize,
          categoryId: selectedTag.id,
        })
          .then((newslist) => {
            if (newslist) {
              if (pageIndex === 1) {
                this.arr_source = [];
              }
              this.arr_source.push(...newslist);
            }
            this.loading = false;
          })
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
