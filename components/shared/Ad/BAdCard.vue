<template>
  <a class="b-ad-card" :href="data.link" target="_blank">
    <div
      class="b-ad-card__img"
      :style="{
        backgroundImage: img,
      }"
    ></div>
    <div class="b-ad-card__text">
      <div class="b-ad-card__price">
        <div>NTD {{ data.salePrice }}</div>
      </div>
      <div class="b-ad-card__title">{{ data.title }}</div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    img() {
      return this.data && this.data.img
        ? `url(${this.data.img})`
        : "transparent";
    },
  },
};
</script>

<style scoped>
.b-ad-card {
  display: grid;
  grid-template-rows: 200px 1fr;
  width: 200px;
  background-color: #fafafa;
  border-radius: 16px;
  border: 0.5px solid #dbdbdb;
  padding: 3px 0px 0px 3px;
  overflow: hidden;
}
.b-ad-card__img {
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #ffffff;
}
.b-ad-card__text {
  font-size: 15px;
  padding: 6px;
}
.b-ad-card__title {
  color: #393939;
  font-weight: bold;
}
.b-ad-card__price {
  color: #b7b7b7;
  font-size: 13px;
}
</style>
