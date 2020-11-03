<template>
  <div
    :class="[
      'b-audiovisual-block',
      masonry ? 'b-audiovisual-block_masonry' : '',
    ]"
  >
    <div>
      <div class="b-audiovisual-block__title">{{ titleLabel }}</div>
    </div>
    <div>
      <b-masonry-scroll :items="source" v-if="masonry" @loadMore="loadMore">
        <template v-slot:default="props">
          <b-audiovisual-card
            :thumbnail="props.item.thumbnail"
            :title-label="props.item.title"
            :author="props.item.author"
            :views="props.item.views"
            :pageLink="props.item.pageLink"
            :link="props.item.link"
          />
        </template>
      </b-masonry-scroll>
      <b-horizontal-scroll v-else>
        <template v-for="(item, index) in source">
          <b-audiovisual-card :key="index" :data="item" />
        </template>
      </b-horizontal-scroll>
    </div>
  </div>
</template>

<script>
import audiovisuals from "@/assets/json/fake/audiovisual.json";

export default {
  props: {
    titleLabel: {
      type: String,
      default: "",
    },
    masonry: {
      type: Boolean,
      default: false,
    },
    planetId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      source: [],
    };
  },
  methods: {
    init(planetId) {
      this.source = [];
      const payload = {
        pageIndex: 1,
        pageSize: 10,
      };
      setTimeout(() => {
        this.$store
          .dispatch("audiovisual/fetch", payload)
          .then((list) => (this.source = list));
      }, 500);
    },
  },
  watch: {
    planetId: {
      immediate: true,
      handler(value) {
        this.init(value);
      },
    },
  },
};
</script>

<style scoped>
.b-audiovisual-block__title {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 1.25em;
  position: relative;
  margin-bottom: 10px;
}
.b-horizontal-scroll > *:not(:last-child) {
  margin-right: 16px;
}
</style>
