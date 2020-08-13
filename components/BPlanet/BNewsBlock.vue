<template>
  <div class="b-news-block">
    <div>
      <div class="b-news-block__title">{{ titleLabel }}</div>
    </div>
    <div class="b-news-block__tags" v-if="tagsData.length > 0">
      <b-horizontal-scroll>
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
      <b-masonry-scroll :items="arr_source" @load-more="loadMore">
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
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tagsData: [],
      arr_source: [],
    };
  },
  created() {
    this.$watch(
      "tags",
      function (newVal, oldVal) {
        if (newVal.length > 0) {
          this.tagsData = newVal.map((tag, index) => ({
            title: tag,
            tagged: index ? false : true,
          }));
        }
      },
      { immediate: true }
    );
  },
  mounted() {
    this.arr_source = this.source;
  },
  methods: {
    toggleTag(targetIndex) {
      this.tagsData = this.tagsData.map((tag, index) => ({
        ...tag,
        tagged: targetIndex === index,
      }));
    },
    loadMore({ pageSize, pageIndex }) {
      setTimeout(() => {
        this.arr_source = this.arr_source.concat(this.source);
      }, 500);
    },
  },
  watch: {
    source(value) {
      this.arr_source = value;
    },
  },
};
</script>

<style scoped>
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
}
.b-news-block__tags .b-horizontal-scroll {
  height: 44px;
  align-items: center;
}
.b-news-block__tags .b-horizontal-scroll > *:not(:last-child) {
  margin-right: 12px;
}
</style>
