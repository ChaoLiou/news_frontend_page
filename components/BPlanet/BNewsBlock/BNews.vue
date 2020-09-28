<template>
  <div class="b-news" @click="toWebview">
    <div class="b-news__card">
      <div class="b-news__thumbnail">
        <img class="b-news__thumbnail-img-2" :src="thumbnail" @load="heightChanged" />
      </div>
      <div class="b-news__info">
        <div class="b-news__source">{{ source }}</div>
        <div class="b-news__title">{{ titleLabel }}</div>
      </div>
      <div v-if="poll" class="b-news__action">
        <div>去投票</div>
        <div>看結果</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    titleLabel: {
      type: String,
      default: "",
    },
    poll: {
      type: Boolean,
      default: false,
    },
    pageLink: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  mounted() {
    window.addEventListener("resize", this.heightChanged);
  },
  methods: {
    toWebview() {
      // BGO.open_full_h5_webview
      BGO.redirect_uri_by_default_browser(this.link, (data) => {
        console.log(data);
      });
    },
    heightChanged() {
      if (this.$el.offsetHeight > 0) {
        this.$parent.$emit("heightChanged", this.$el.offsetHeight);
      }
    },
  },
};
</script>

<style scoped>
.b-news {
  display: block;
}
.b-news__card {
  width: 100%;
  background-color: #fafafa;
  border-radius: 6px;
  overflow: hidden;
  border: 0.5px solid #dbdbdb;
}
.b-news__thumbnail {
  overflow: hidden;
  position: relative;
}
.b-news__thumbnail-img-2 {
  width: 100%;
  height: 100%;
}
.b-news__info {
  padding: 10px;
  font-size: 0.8em;
}
.b-news__source {
  font-size: 0.8em;
  color: #979797;
  font-weight: bold;
}
.b-news__title {
  font-weight: bold;
}
.b-news__action {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  padding-bottom: 10px;
}
.b-news__action > div {
  border: 1px solid #979797;
  border-radius: 5px;
  font-size: 0.64em;
  color: #767676;
  padding: 4px 14px;
}
</style>
