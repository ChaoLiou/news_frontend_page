<template>
  <div class="b-ad-card" @click="navigate">
    <div
      class="b-ad-card__img"
      :style="{
        backgroundImage: img,
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
    discount() {
      const discount = Math.trunc(
        (this.data.salePrice / this.data.price) * 100
      );
      return discount % 10 === 0 ? discount / 10 : discount;
    },
  },
  methods: {
    navigate() {
      this.$emit("navigate", this.data);
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
  overflow: hidden;
}
.b-ad-card:hover {
  cursor: pointer;
}
.b-ad-card__img {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #eeeeee;
}
.b-ad-card__text {
  font-size: 15px;
  padding: 6px;
}
.b-ad-card__title {
  color: #767676;
  font-weight: 400;
  line-height: 18px;
  padding-top: 4px;
}
.price__original {
  font-size: 13px;
  line-height: 18px;
  font-weight: bold;
  color: #262626;
}
.price__original_deleted {
  text-decoration: line-through;
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
