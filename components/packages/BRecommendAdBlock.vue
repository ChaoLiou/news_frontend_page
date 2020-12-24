<template>
  <div class="b-recommend-ad-block" v-show="recommendationEnabled">
    <div class="b-recommend-ad-block__title" v-if="titleText">
      {{ titleText }}
    </div>
    <b-horizontal-scroll
      :loading="loading"
      :placeholder-style="{
        height: '325px',
        width: '200px',
        marginRight: '16px',
        borderRadius: '16px',
      }"
    >
      <template v-for="(item, index) in source">
        <b-ad-card :key="index" :data="item" @navigate="navigate" />
      </template>
    </b-horizontal-scroll>
  </div>
</template>
<script>
import BAdCard from "../shared/Ad/BAdCard";
import BHorizontalScroll from "../shared/BHorizontalScroll";
import { get } from "./../../assets/js/fetchAPI";
import { formatProduct } from "../../assets/js/recommendation/formatter";
import { actions } from "../../store/api/news";
/**
 * 推薦廣告區塊
 */
export default {
  components: {
    BAdCard,
    BHorizontalScroll,
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
     * 推薦 api 前綴, e.g. `https://your.api.origin/vn`
     */
    recommendationApiPrefix: {
      type: String,
      default: "",
    },
    /**
     * 啟用推薦 api
     */
    recommendationEnabled: {
      type: Boolean,
      default: true,
    },
    /**
     * 以關鍵字取得廣告
     */
    keyword: {
      type: String,
      default: "",
    },
    /**
     * 標題文字
     */
    titleText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: true,
      source: [],
    };
  },
  methods: {
    navigate(data) {
      /**
       * 點擊廣告
       * @property {Object} data 廣告資料, 結構如同 [BAdCard](#badcard) 的 data property
       */
      this.$emit("navigate", data);
    },
    async load(keyword) {
      try {
        this.loading = true;
        if (this.recommendationEnabled) {
          const { fetchRecommendation } = actions;
          const res = await fetchRecommendation(
            undefined,
            {
              keyword,
            },
            this.recommendationApiPrefix
          );
          if (res && Array.isArray(res.products)) {
            this.source = res.products.map(formatProduct);
          }
        }
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    keyword: {
      immediate: true,
      handler(value) {
        if (value) {
          this.load(value);
        }
      },
    },
  },
};
</script>
<style scoped>
.b-horizontal-scroll > .b-ad-card {
  margin-top: 4px;
}
.b-horizontal-scroll > .b-ad-card:not(:last-child) {
  margin-right: 1em;
}
.b-recommend-ad-block__title {
  font-weight: bold;
  margin: 16px 0px;
}
</style>
