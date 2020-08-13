<template>
  <div class="planet-news">
    <b-planet :planet="planet"></b-planet>
  </div>
</template>

<script>
import BPlanet from "@/components/BPlanet.vue";
import planetsConf from "@/assets/json/planets.json";
import fakedata from "@/assets/json/fakedata.json";
export default {
  components: {
    BPlanet
  },
  computed: {
    planet() {
      return this.$combineFakeData(planetsConf, fakedata).find(
        p => p.id === this.$route.params.planet
      );
    }
  }
};
</script>

<style scoped>
.planet-news {
  padding-top: 8px;
}
</style>
