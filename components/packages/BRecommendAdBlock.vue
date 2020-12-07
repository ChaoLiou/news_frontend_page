<template>
  <div class="b-recommend-ad-block">
    <div>
      <b-horizontal-scroll>
        <template v-for="(item, index) in source">
          <b-ad-card :key="index" :data="item" />
        </template>
      </b-horizontal-scroll>
    </div>
  </div>
</template>
<script>
import BAdCard from "../shared/Ad/BAdCard";
import BHorizontalScroll from "../shared/BHorizontalScroll";
import { get } from "./../../assets/js/fetchAPI";
import { formatProduct } from "../../assets/js/recommendation/formatter";
import { actions } from "../../store/api/news";

export default {
  components: {
    BAdCard,
    BHorizontalScroll,
  },
  props: {
    recommendationApiPrefix: {
      type: String,
      default: "",
    },
    newsTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      source: [],
    };
  },
  methods: {
    async load(keyword) {
      try {
        this.loading = true;
        const { fetchRecommendation } = actions;
        const res = await fetchRecommendation(
          undefined,
          {
            keyword,
          },
          this.recommendationApiPrefix
        );
        this.source = (res.products || []).map(formatProduct);
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    newsTitle: {
      immediate: true,
      handler(value) {
        this.load(value);
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
</style>
