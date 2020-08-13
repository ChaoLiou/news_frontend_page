<template>
  <div class="index">
    <div class="universe" @touchstart="recordTouchStart" @touchend="detectDirectionThenMove">
      <div class="slider__to slider__to_left" @click="move('left')"></div>
      <div class="slider__to slider__to_right" @click="move('right')"></div>
      <template v-for="(planet, index) in planets">
        <nuxt-link
          v-show="planet.position === 'middle'"
          :to="planet.position === 'middle' ? planet.link : '/'"
          :key="`planet-info-${index}`"
          class="universe__planet-info"
        >
          <div class="planet-info__title">{{ planet.title }}</div>
          <div class="planet-info__brief">{{ planet.brief }}</div>
        </nuxt-link>
        <nuxt-link :to="planet.position === 'middle' ? planet.link : '/'" :key="`planet-${index}`">
          <div
            :class="['universe__planet', `universe__planet_${planet.position}`]"
            :style="{
              backgroundImage: `url('${planet.img}')`,
              width: planet.width,
              height: planet.height
            }"
            @click="move(planet)"
          >
            <div
              class="universe__satellite"
              :style="{
                background: `url('${planet.satellite.img}')`,
                ...planet.satellite.style
              }"
            ></div>
          </div>
        </nuxt-link>
      </template>
    </div>
    <div class="planet-content">
      <b-planet :planet="planet" :news-tags="newsTags" />
    </div>
  </div>
</template>

<script>
import BPlanet from "@/components/BPlanet.vue";
import planetsConf from "@/assets/json/planets.json";
import fakedata from "@/assets/json/fakedata.json";
export default {
  components: {
    BPlanet,
  },
  data() {
    return {
      planets: [],
      touchStartX: 0,
      planet: undefined,
      newsTags: [],
    };
  },
  mounted() {
    const conf = this.$combineFakeData(planetsConf, fakedata);
    this.planets = conf;
    this.planet = conf[0];
  },
  methods: {
    recordTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    },
    detectDirectionThenMove(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const moveDistance = 50;
      if (this.touchStartX - touchEndX > moveDistance) {
        this.move("left");
      } else if (touchEndX - this.touchStartX > moveDistance) {
        this.move("right");
      }
    },
    move(direction) {
      let positions = [];
      if (direction === "left") {
        positions = [
          { current: "left", new: "right" },
          { current: "middle", new: "left" },
          { current: "right", new: "middle" },
        ];
      } else if (direction === "right") {
        positions = [
          { current: "left", new: "middle" },
          { current: "middle", new: "right" },
          { current: "right", new: "left" },
        ];
      }
      let temp = [];
      positions.forEach((position) => {
        const planet = this.planets.find(
          (planet) => planet.position === position.current
        );
        temp.push(planet);
      });
      temp.forEach((planet, index) => {
        planet.position = positions[index].new;
      });
      this.planet = this.planets.find((planet) => planet.position === "middle");
    },
  },
};
</script>

<style scoped>
.universe {
  background: url("/icons/universe.svg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  position: relative;
}
.universe__planet {
  position: absolute;
  transition: 0.5s all ease-in-out;
}
.universe__planet > a {
  width: 100%;
  height: 100%;
}
.universe__planet_left {
  z-index: 2;
  top: 12.5%;
  left: 0px;
  transform: scale(0.4) translateX(-125%);
}
.universe__planet_middle {
  z-index: 3;
  left: 50%;
  top: 33%;
  transform: translate(-50%, -25%);
}
.universe__satellite {
  transition: 0.5s opacity ease-in;
  opacity: 0;
}
.universe__planet_middle .universe__satellite {
  opacity: 1;
}
.universe__planet_right {
  z-index: 1;
  top: 12.5%;
  left: 100%;
  transform: scale(0.4) translateX(-125%);
}
.slider__to_left {
  background: url("/icons/arrow-left.png");
  left: 0px;
  background-position-x: left;
}
.slider__to_right {
  background: url("/icons/arrow-right.png");
  right: 0px;
  background-position-x: right;
}
.slider__to {
  z-index: 4;
  position: absolute;
  top: 0;
  width: 35px;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.universe__satellite {
  position: absolute;
  width: 57px;
  height: 58px;
}
.universe__planet-info {
  display: block;
  padding: 22px;
}
.planet-info__title {
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 4px;
}
.planet-info__brief {
  font-size: 0.9em;
  color: #a8a8a8;
}
.planet-content {
  margin-top: -10vh;
}
.planet-content .b-planet {
  background: #ffffff;
}
</style>
