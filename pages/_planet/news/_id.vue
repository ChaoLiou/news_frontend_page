<template>
  <div class="planet-news-id">
    <b-news-header :header="news.metadata" />
    <b-news-detail :detail="news.content" :link="news.metadata.link" />
    <div class="planet-news-id__ad-block">
      <div class="planet-news-id__ad-title">不能錯過</div>
      <b-horizontal-scroll>
        <b-ad-card
          v-for="(item, index) in ads"
          :key="index"
          :thumbnail="item.img"
          :title-label="item.title"
          :price="item.price"
        />
      </b-horizontal-scroll>
    </div>
    <b-news-block title-label="你可能會喜歡" :source="others" />
  </div>
</template>

<script>
import BNewsHeader from "@/components/BPlanet/BNewsBlock/BNewsHeader.vue";
import BNewsDetail from "@/components/BPlanet/BNewsBlock/BNewsDetail.vue";
import BHorizontalScroll from "@/components/shared/BHorizontalScroll.vue";
import BAdCard from "@/components/shared/Ad/BAdCard.vue";
import BNewsBlock from "@/components/BPlanet/BNewsBlock.vue";
import fakenews from "@/assets/json/fakenews.json";
import fakeads from "@/assets/json/fakeads.json";
import planetsConf from "@/assets/json/planets.json";
import fakedata from "@/assets/json/fakedata.json";
export default {
  components: {
    BNewsHeader,
    BNewsDetail,
    BHorizontalScroll,
    BAdCard,
    BNewsBlock
  },
  data() {
    return { ads: fakeads };
  },
  computed: {
    news() {
      return fakenews.find(
        p =>
          (p.id === "1" || p.id === this.$route.params.id) &&
          p.planet === this.$route.params.planet
      );
    },
    others() {
      return this.$combineFakeData(planetsConf, fakedata)
        .find(planet => this.$route.params.planet === planet.id)
        .contentTypes.find(ct => ct.id === "news")
        .items.filter((news, index) => !!index);
    }
  }
};
</script>

<style scoped>
hr {
  color: #dbdbdb;
  size: 1px;
}
.planet-news-id__ad-block {
  padding: 15px 0px 15px 15px;
}
.b-news-block {
  padding: 15px;
}
.planet-news-id__ad-title {
  font-weight: bold;
  font-size: 1.25em;
}
.b-horizontal-scroll > .b-ad-card {
  margin-top: 4px;
}
.b-horizontal-scroll > .b-ad-card:not(:last-child) {
  margin-right: 16px;
}
</style>
