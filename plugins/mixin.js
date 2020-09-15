import Vue from "vue";
import utils from "@/assets/js/utils.js";

Vue.mixin({
  data() {
    return {
      BASE_URL: JSON.parse(process.env.BASE_URL),
      debug_mode: false
    };
  },
  methods: {
    $combineFakeData: utils.combineFakeData,
    getPlanets(lang = "zh", country = "TW") {
      const url = `${this.BASE_URL.news}/main?lang=${lang}&country=${country}`;
      if (this.debug_mode) console.log(url);
      return fetch(url)
        .then(res => res.json())
        .then(json => json.data);
    },
    getNewsCategories(planetId) {
      const url = `${this.BASE_URL.news}/category?bannerID=${planetId}`;
      if (this.debug_mode) console.log(url);
      return fetch(url)
        .then(res => res.json())
        .then(json => json.data);
    },
    getNews({ page, pageSize, categoryId }) {
      let url = `${this.BASE_URL.news}/news?page=${page}&pageSize=${pageSize}`;
      if (categoryId) {
        url += `&categoryID=${categoryId}`;
      }
      if (!this.$store.state.token.ts) {
        this.$store.commit("token/renew");
      }
      url += `&timestamp=${this.$store.state.token.ts}`;
      if (this.debug_mode) console.log(url);
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
