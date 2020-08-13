<template>
  <div class="b-news-header">
    <div class="b-news-header__thumbnail" :style="{
      backgroundImage: s_thumbnail
    }"></div>
    <div class="b-news-header__text">
      <div class="b-news-header__title">{{header.title}}</div>
      <div>
        <div class="b-news-header__info">
          <div>{{header.source}}</div>
          <div>｜</div>
          <div>{{header.author}}</div>
        </div>
        <div class="b-news-header__time">
          <div>發布時間：{{header.published}}</div>
          <div>更新時間：{{header.updated}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    s_thumbnail() {
      return this.header.thumbnail
        ? `url(${this.header.thumbnail})`
        : "transparent";
    }
  }
};
</script>

<style scoped>
.b-news-header {
  display: grid;
  grid-template-rows: 200px 1fr;
}
.b-news-header__text {
  padding: 15px 10px;
  font-weight: bold;
}
.b-news-header__thumbnail {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.b-news-header__title {
  font-size: 1.25em;
}
.b-news-header__info {
  display: flex;
  padding: 6px 0px;
  color: #c4c4c4;
}
.b-news-header__info > *:first-child {
  color: #393939;
}
.b-news-header__time {
  color: #c4c4c4;
}
</style>
