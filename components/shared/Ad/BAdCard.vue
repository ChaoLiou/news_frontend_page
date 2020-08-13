<template>
  <div class="b-ad-card">
    <div class="b-ad-card__thumbnail" :style="{
          backgroundImage: s_thumbnail
        }"></div>
    <div class="b-ad-card__text">
      <div class="b-ad-card__title">{{titleLabel}}</div>
      <div class="b-ad-card__price">NT $ {{price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      default: undefined
    },
    titleLabel: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    }
  },
  computed: {
    s_thumbnail() {
      return this.thumbnail ? `url(${this.thumbnail})` : "transparent";
    }
  }
};
</script>

<style scoped>
.b-ad-card {
  display: grid;
  grid-template-rows: 135px 1fr;
  width: 135px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 0.5px solid #dbdbdb;
  padding: 3px 0px 0px 3px;
}
.b-ad-card__thumbnail {
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  background-color: #ffffff;
}
.b-ad-card__text {
  font-size: 0.8em;
  padding: 6px;
}
.b-ad-card__title {
  color: #393939;
  font-weight: bold;
}
.b-ad-card__price {
  color: #b7b7b7;
  font-size: 0.8em;
}
</style>
