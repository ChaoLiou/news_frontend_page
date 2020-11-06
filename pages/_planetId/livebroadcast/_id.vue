<template>
  <div class="planet-audiovisual-id">
    <div class="planet-audiovisual-id__author">
      <div
        class="planet-audiovisual-id__author-img"
        :style="{
          backgroundImage: `url(${livebroadcast.authorImg})`,
        }"
      ></div>
      <div class="planet-audiovisual-id__author-name">
        {{ livebroadcast.author }}
      </div>
    </div>
    <div
      class="planet-audiovisual-id__content"
      v-for="(audiovisual, index) in livebroadcast.items"
      :key="index"
    >
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
      <div class="planet-audiovisual-id__video-meta">
        <div class="planet-audiovisual-id__video-title">
          {{ audiovisual.title }}
        </div>
        <div class="planet-audiovisual-id__video-views">
          觀看次數: {{ audiovisual.views }}次
        </div>
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
    <b-live-broadcast-block
      masonry
      title-label="你可能會喜歡"
      :source="others"
    />
  </div>
</template>

<script>
import planetsConf from "@/assets/json/planets.json";
export default {
  data() {
    return {
      ads: fakeads,
    };
  },
  computed: {
    livebroadcast() {
      return;
    },
    others() {
      return;
    },
    audiovisuals() {
      return;
    },
  },
};
</script>

<style scoped>
.planet-audiovisual-id__content {
  margin-top: 65px;
}
.planet-audiovisual-id__video-frame {
  width: 100vw;
  height: calc(100vw * 362 / 644);
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
  display: grid;
  grid-template-columns: 3em auto;
  position: fixed;
  top: 0px;
  z-index: 99;
  width: 100vw;
  background-color: #ffffff;
  border-bottom: 0.5px solid #dbdbdb;
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
  justify-self: center;
  font-weight: bold;
  font-size: 1.25em;
}
</style>
