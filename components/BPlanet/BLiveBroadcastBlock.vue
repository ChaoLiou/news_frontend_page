<template>
  <div
    :class="[
      'b-live-broadcast-block',
      masonry ? 'b-live-broadcast-block_masonry' : '',
    ]"
    :style="{
      gridTemplateColumns: masonry
        ? '1fr'
        : `${titleLabelWidth} calc(100% - ${titleLabelWidth})`,
    }"
  >
    <div class="b-live-broadcast-block__title">
      <div ref="titleLabel">{{ titleLabel }}</div>
    </div>
    <div>
      <b-masonry-scroll :items="arr_source" v-if="masonry" @loadMore="loadMore">
        <template v-slot:default="props">
          <b-live-broadcast
            :thumbnail="props.item.img"
            :live="props.item.live"
            :pageLink="props.item.pageLink"
            :link="props.item.link"
            size="140px"
          />
        </template>
      </b-masonry-scroll>
      <b-horizontal-scroll v-else>
        <template v-for="(item, index) in source">
          <b-live-broadcast
            :key="index"
            :thumbnail="item.img"
            :live="item.live"
            :pageLink="item.pageLink"
            :link="item.link"
          />
        </template>
      </b-horizontal-scroll>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleLabel: {
      type: String,
      default: "推薦直,播台",
    },
    source: {
      type: Array,
      default() {
        return [];
      },
    },
    masonry: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      titleLabelWidth: "100px",
      arr_source: [],
    };
  },
  mounted() {
    this.titleLabelWidth = `${this.titleLabel.length + 2}em`;
    this.arr_source = this.source;
  },
  methods: {
    loadMore() {
      setTimeout(() => {
        this.arr_source = this.arr_source.concat(this.source);
      }, 500);
    },
  },
  watch: {
    source(value) {
      this.arr_source = value;
    },
  },
};
</script>

<style scoped>
.b-live-broadcast-block {
  display: grid;
  padding: 15px 0px 15px 15px;
}
.b-live-broadcast-block_masonry {
  padding: 15px;
}
.b-live-broadcast-block__title {
  font-weight: bold;
  align-self: center;
  font-size: 1.25em;
  position: relative;
  margin-bottom: 10px;
}
.b-horizontal-scroll > * {
  margin-left: 8px;
}
.b-horizontal-scroll {
  background-color: #fafafa;
}
</style>
