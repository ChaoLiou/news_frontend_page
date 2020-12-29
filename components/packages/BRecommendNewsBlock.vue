<template>
  <div class="b-recommend-news-block">
    <div>
      <b-masonry-scroll
        :loading="loading"
        :source="source"
        :triggerable-predicate="(x) => !x.recommendation"
        :placeholder-style="{
          borderRadius: '20px',
        }"
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
import BMasonryScroll from "../shared/BMasonryScroll";
import BNewsCard from "../BPlanet/BNewsBlock/BNewsCard";
import { get } from "./../../assets/js/fetchAPI";
import { actions } from "../../store/api/news";
import { formatNews } from "./../../assets/js/formatter";
import { formatNews as formatRecommendationNews } from "../../assets/js/recommendation/formatter";
/**
 * 推薦新聞區塊
 */
export default {
  components: {
    BMasonryScroll,
    BNewsCard,
  },
  props: {
    /**
     * api 前綴, e.g. `https://your.api.origin/vn`
     */
    apiPrefix: {
      type: String,
      default: "",
    },
    /**
     * 推薦服務的 api 前綴, e.g. `https://your.api.origin/vn`
     */
    recommendationApiPrefix: {
      type: String,
      default: "",
    },
    /**
     * 啟用推薦服務
     */
    recommendationEnabled: {
      type: Boolean,
      default: true,
    },
    /**
     * 對推薦項目下樣式
     */
    recommendationStyled: {
      type: Boolean,
      default: true,
    },
    /**
     * 新聞內頁的新聞 Id
     */
    newsId: {
      type: String,
      default: "",
    },
    /**
     * 新聞內頁的新聞所屬星球 Id
     */
    planetId: {
      type: String,
      default: "",
    },
    /**
     * 語言
     */
    lang: {
      type: String,
      default: "zh_TW",
    },
    /**
     * 國家地區
     */
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
    navigate(data) {
      /**
       * 點擊新聞
       * @property {Object} data 新聞資料, 結構如同 [BNewsCard](#bnewscard) 的 data property
       */
      this.$emit("navigate", data);
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
        const pagelist = res.data.map(formatNews);
        list.push(...pagelist);
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
