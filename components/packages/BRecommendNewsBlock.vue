<template>
  <div class="b-recommend-news-block">
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
import { formatNews } from "./../../assets/js/formatter";
import bMasonryScroll from "../shared/BMasonryScroll";
import bNews from "../BPlanet/BNewsBlock/BNews";
import { openFullH5Webview } from "./../../assets/js/beanfun";
import { generateUUID, getQueryString } from "./../../assets/js/utils";
import { get } from "./../../assets/js/fetchAPI";

export default {
  components: {
    bMasonryScroll,
    bNews,
  },
  props: {
    apiPrefix: {
      type: String,
      default: "",
    },
    newsId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      source: [],
      loading: true,
    };
  },
  methods: {
    navigate(data) {
      const { session_id, action_index } = getQueryString();
      let new_session_id, new_action_index;
      if (session_id && action_index) {
        new_session_id = session_id;
        new_action_index = parseInt(action_index) + 1;
      } else {
        new_session_id = generateUUID();
        new_action_index = 0;
      }
      this.$emit("navigate", {
        data,
        session_id: new_session_id,
        action_index: new_action_index,
      });
    },
    init() {
      this.loading = true;
      this.source = [];
      this.loadMore();
    },
    loadMoreNews(list, pageIndex) {
      if (list) {
        if (pageIndex === 1) {
          this.source = [];
        }
        this.source.push(...list);
      }
      this.loading = false;
    },
    loadMore({ pageSize, pageIndex } = { pageSize: 10, pageIndex: 1 }) {
      this.loading = true;
      const apiRelative = `recommendedNews?page=${pageIndex}&pageSize=${pageSize}&news_id=${this.newsId}`;
      get(apiRelative, this.apiPrefix)
        .then((json) => json.data.map(formatNews))
        .then((list) => this.loadMoreNews(list, pageIndex))
        .then(() => (this.loading = false))
        .catch(() => (this.loading = false));
    },
  },
  watch: {
    newsId: {
      immediate: true,
      handler(value) {
        this.init();
      },
    },
  },
};
</script>

<style scoped>
</style>
