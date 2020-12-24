import Vue from "vue";

Vue.mixin({
  computed: {
    planetName() {
      const target = this.$store.getters["planet/find"](this.planetId);
      return target ? target.name : "星球";
    },
    serverEnv() {
      return this.$store.getters["serverEnv/env"];
    }
  }
});
