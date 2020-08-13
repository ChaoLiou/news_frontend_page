<template>
  <div class="b-news-detail">
    <div v-html="detail"></div>
    <div class="b-news-detail__footer">
      <a class="b-news-detail__origin-link" :href="link" target="blank">
        <div>查看原始文章</div>
        <div class="b-news-detail__right-arrow"></div>
      </a>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
.b-news-detail img {
  width: 100% !important;
  height: calc(100% * (428 / 640)) !important;
}
.b-news-detail__content {
  padding: 6px 10px;
  font-weight: bold;
}
.b-news-detail .acglink {
  color: #0055aa;
}
.b-news-detail .video .img1 {
  height: calc(100vw * 9 / 16);
  margin: 10px 0px;
}
.b-news-detail__footer {
  margin: 32px 0px;
}
.b-news-detail__origin-link {
  display: flex;
  color: #b7b7b7;
  font-size: 0.8em;
  justify-content: center;
}
.b-news-detail__right-arrow {
  background-image: url("/icons/arrow-right.svg");
  width: 5px;
  height: 12px;
  margin: 0px 9px;
  align-self: center;
}
</style>
