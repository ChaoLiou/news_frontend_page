<template>
  <div class="b-ad-card" @click="navigate">
    <div
      class="b-ad-card__img"
      :style="{
        backgroundImage: img
      }"
    ></div>
    <div class="b-ad-card__text">
      <div class="b-ad-card__price">
        <div
          v-if="data.price"
          class="price__original"
          :class="{ price__original_deleted: data.discounted }"
        >
          ${{ data.price }}
        </div>
        <div v-if="data.salePrice && data.discounted" class="price__special">
          <div>獨賣價</div>
          <div class="price__current">${{ data.salePrice }}</div>
          <div class="price_discount">
            <div>{{ discount }}折</div>
          </div>
        </div>
      </div>
      <div class="b-ad-card__title">{{ data.title }}</div>
    </div>
  </div>
</template>

<script>
import VueTypes from "vue-types";
/**
 * 廣告卡片
 */
export default {
  props: {
    data: VueTypes.shape({
      img: VueTypes.string, // 廣告圖片
      title: VueTypes.string, // 廣告標題
      link: VueTypes.string, // 廣告連結
      salePrice: VueTypes.integer, // 廣告折扣價
      price: VueTypes.integer, // 廣告原價
      discounted: VueTypes.bool // 是否折扣
    })
  },
  computed: {
    img() {
      return this.data && this.data.img
        ? `url(${this.data.img})`
        : "transparent";
    },
    discount() {
      const discount = Math.trunc(
        (this.data.salePrice / this.data.price) * 100
      );
      return discount % 10 === 0 ? discount / 10 : discount;
    }
  },
  methods: {
    navigate() {
      /**
       * 點擊廣告
       * @property {Object} data 廣告資料, 結構如同 data property
       */
      this.$emit("navigate", this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.b-ad-card {
  display: grid;
  grid-template-rows: 200px 1fr;
  width: 200px;
  background-color: #fafafa;
  border-radius: 16px;
  border: 0.5px solid #dbdbdb;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  &__img {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #eeeeee;
  }
  &__text {
    font-size: 15px;
    padding: 6px;
  }
  &__title {
    color: #767676;
    font-weight: 400;
    line-height: 18px;
    padding-top: 4px;
  }
}
.price__original {
  font-size: 13px;
  line-height: 18px;
  font-weight: bold;
  color: #262626;
  &_deleted {
    text-decoration: line-through;
  }
}
.price__special {
  display: grid;
  grid-template-columns: 45px repeat(2, 1fr);
  font-size: 10px;
  color: #cd2c3d;
  font-weight: bold;
  align-items: end;
}
.price__current {
  font-size: 15px;
}
.price_discount {
  justify-self: end;
  border: 1px #cd2c3d solid;
  border-radius: 5px;
  font-size: 10px;
  padding: 0px 1px;
}
</style>
