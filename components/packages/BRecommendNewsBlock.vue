<template>
  <div class="b-recommend-news-block">
    <div>
      <b-masonry-scroll
        :loading="loading"
        :items="source"
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
import { formatNews } from "./../../assets/js/formatter";
import bMasonryScroll from "../shared/BMasonryScroll";
import bNews from "../BPlanet/BNewsBlock/BNews";
import { openFullH5Webview } from "./../../assets/js/beanfun";
import { generateUUID, getQueryString } from "./../../assets/js/utils";
import { get } from "./../../assets/js/fetchAPI";
import { actions } from "../../store/api/news";
import { formatNews as formatRecommendationNews } from "../../assets/js/recommendation/formatter";

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
    recommendationApiPrefix: {
      type: String,
      default: "",
    },
    recommendationEnabled: {
      type: Boolean,
      default: true,
    },
    newsId: {
      type: String,
      default: "",
    },
    planetId: {
      type: String,
      default: "",
    },
    lang: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      source: [],
      loading: true,
      planets: [],
    };
  },
  methods: {
    getPlanets() {
      get(
        `main?lang=${this.lang}&country=${this.country}`,
        this.apiPrefix
      ).then((res) => (this.planets = res.data));
    },
    getPlanetTitle(planetId) {
      console.log({ planets: this.planets, planetId });
      const planet = this.planets.find((x) => x.id === planetId);
      return planet ? planet.name : "星球";
    },
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
    async loadMore({ pageSize, pageIndex } = { pageSize: 10, pageIndex: 1 }) {
      try {
        this.loading = true;
        let list = [];
        if (this.recommendationEnabled && pageIndex === 1) {
          const { fetchRecommendation } = actions;
          const res = await fetchRecommendation(
            undefined,
            {
              newsId: this.newsId,
              planetId: this.planetId,
            },
            this.recommendationApiPrefix
          );
          if (Array.isArray(res)) {
            list = res.map(formatRecommendationNews);
          } else {
            console.error(
              `[store/news/fetch] an error has occured: ${
                res ? res.message : ""
              }`
            );
          }
        }

        const apiRelative =
          `recommendedNews?` +
          `page=${pageIndex}&` +
          `pageSize=${pageSize}&` +
          `news_id=${this.newsId}&` +
          `lang=${this.lang}&` +
          `country=${this.country}`;
        const res = await get(apiRelative, this.apiPrefix);
        list.push(...res.data.map(formatNews));

        this.loadMoreNews(list, pageIndex);
      } catch (error) {
        console.error(error);
      }
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
