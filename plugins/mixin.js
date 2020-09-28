import Vue from "vue";
import utils from "@/assets/js/utils.js";

Vue.mixin({
  data() {
    return {
      baseUrl: JSON.parse(process.env.BASE_URL),
      debugMode: false
    };
  },
  methods: {
    $combineFakeData: utils.combineFakeData,
    getPlanets(lang = "zh_TW", country = "TW") {
      const url = `${this.baseUrl.news}/main?lang=${lang}&country=${country}`;
      if (this.debugMode) console.log(url);
      return fetch(url)
        .then(res => res.json())
        .then(json => json.data);
    },
    getNewsCategories(planetId, lang = "zh_TW", country = "TW") {
      const url = `${this.baseUrl.news}/category?bannerID=${planetId}&lang=${lang}&country=${country}`;
      if (this.debugMode) console.log(url);
      return fetch(url)
        .then(res => res.json())
        .then(json => json.data);
    },
    getNews({ page, pageSize, categoryId }) {
      let url = `${this.baseUrl.news}/news?page=${page}&pageSize=${pageSize}`;
      if (categoryId) {
        url += `&categoryID=${categoryId}`;
      }
      if (!this.$store.state.token.ts) {
        this.$store.commit("token/renew");
      }
      url += `&timestamp=${this.$store.state.token.ts}`;
      if (this.debugMode) console.log(url);
      return fetch(url)
        .then(res => res.json())
        .then(json =>
          typeof json.data === typeof [] ? json.data.map(this.formatNews) : null
        );
    },
    formatNews(news) {
      return {
        img: news.Images.length > 0 ? news.Images[0].file_path : undefined,
        title: news.src_title,
        source: "Nownews",
        poll: false,
        pageLink: "",
        link: news.article_path
      };
    }
  }
});
