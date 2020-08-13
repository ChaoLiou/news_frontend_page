import Vue from "vue";
import utils from "@/assets/js/utils.js";

Vue.mixin({
  data() {
    return {
      news_API: ""
    };
  },
  methods: {
    $combineFakeData: utils.combineFakeData,
    getNewsCategories(resolve, reject) {
      fetch(`${this.news_API}/category`)
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
    },
    getNews({ limit, offset, category }, resolve, reject) {
      const url = `${this.news_API}/news?limit=${limit}&offset=${offset}&category=${category}`;
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(json =>
          typeof json === typeof [] ? resolve(json.map(this.formatNews)) : null
        )
        .catch(err => reject(err));
    },
    formatNews(news) {
      return {
        img: "",
        title: news.SrcTitle,
        source: "Nownews",
        poll: false,
        pageLink: "",
        link: news.SrcUrl
      };
    }
  }
});
