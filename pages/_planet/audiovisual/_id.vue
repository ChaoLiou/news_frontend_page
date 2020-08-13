<template>
  <div class="planet-audiovisual-id">
    <div class="planet-audiovisual-id__video-frame">
      <iframe
        width="100%"
        height="100%"
        :src="audiovisual.embed"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="planet-audiovisual-id__content">
      <div class="planet-audiovisual-id__video-meta">
        <div class="planet-audiovisual-id__video-title">{{audiovisual.title}}</div>
        <div class="planet-audiovisual-id__video-views">觀看次數: {{audiovisual.views}}次</div>
        <div class="planet-audiovisual-id__author">
          <div
            class="planet-audiovisual-id__author-img"
            :style="{
              backgroundImage: `url(${audiovisual.authorImg})`,
            }"
          ></div>
          <div class="planet-audiovisual-id__author-name">{{audiovisual.author}}</div>
        </div>
      </div>
      <div class="planet-audiovisual-id__ad-block">
        <div class="planet-audiovisual-id__ad-title">不能錯過</div>
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
      <b-audiovisual-block masonry title-label="你可能會喜歡" :source="others" />
    </div>
  </div>
</template>

<script>
import BAdCard from "@/components/shared/Ad/BAdCard.vue";
import BAudiovisualBlock from "@/components/BPlanet/BAudiovisualBlock.vue";
import BHorizontalScroll from "@/components/shared/BHorizontalScroll.vue";
import planetsConf from "@/assets/json/planets.json";
import fakeads from "@/assets/json/fakeads.json";
import fakedata from "@/assets/json/fakedata.json";
import fakeaudiovisual from "@/assets/json/fakeaudiovisual.json";
export default {
  components: {
    BHorizontalScroll,
    BAdCard,
    BAudiovisualBlock
  },
  data() {
    return {
      ads: fakeads
    };
  },
  computed: {
    audiovisual() {
      return fakeaudiovisual.find(
        p =>
          (p.id === "1" || p.id === this.$route.params.id) &&
          p.planet === this.$route.params.planet
      );
    },
    others() {
      return this.audiovisuals.filter((news, index) => !!index);
    },
    audiovisuals() {
      return this.$combineFakeData(planetsConf, fakedata)
        .find(planet => this.$route.params.planet === planet.id)
        .contentTypes.find(ct => ct.id === "audiovisual").items;
    }
  }
};
</script>

<style scoped>
.planet-audiovisual-id__video-frame {
  z-index: 99;
  width: 100vw;
  height: calc(100vw * 362 / 644);
  position: fixed;
  top: 0px;
  background-color: #dbdbdb;
}
.planet-audiovisual-id__ad-block {
  padding: 15px 0px 15px 15px;
}
.planet-audiovisual-id__ad-title {
  font-weight: bold;
  font-size: 1.25em;
}
.b-horizontal-scroll > .b-ad-card {
  margin-top: 4px;
}
.b-horizontal-scroll > .b-ad-card:not(:last-child) {
  margin-right: 16px;
}
.planet-audiovisual-id__content {
  z-index: 1;
  margin-top: calc(100vw * 362 / 644);
}
.planet-audiovisual-id__video-meta {
  padding: 10px;
}
.planet-audiovisual-id__video-title {
  font-weight: bold;
  font-size: 1.25em;
}
.planet-audiovisual-id__video-views {
  color: #606060;
  display: flex;
  justify-content: flex-end;
}
.planet-audiovisual-id__author {
  display: flex;
}
.planet-audiovisual-id__author-img {
  width: 3em;
  height: 3em;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 0.5px solid #dbdbdb;
  margin: 6px;
}
.planet-audiovisual-id__author-name {
  align-self: center;
}
</style>
