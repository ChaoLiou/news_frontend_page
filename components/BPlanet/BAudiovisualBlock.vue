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
      <b-masonry-scroll :items="arr_source" v-if="masonry" @loadMore="loadMore">
        <template v-slot:default="props">
          <b-audiovisual
            :thumbnail="props.item.img"
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
          <b-audiovisual
            :key="index"
            :thumbnail="item.img"
            :title-label="item.title"
            :author="item.author"
            :views="item.views"
            :pageLink="item.pageLink"
            :link="item.link"
            width="140px"
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
      default: "快速影片",
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
      arr_source: [],
    };
  },
  mounted() {
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
.b-audiovisual-block {
  padding: 15px 0px 15px 15px;
}
.b-audiovisual-block_masonry {
  padding: 15px;
}
.b-audiovisual-block__title {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 1.25em;
  position: relative;
  margin-bottom: 10px;
}
.b-horizontal-scroll {
  background-color: #fafafa;
}
.b-horizontal-scroll > *:not(:last-child) {
  margin-right: 16px;
}
</style>
<style>
.b-masonry-scroll .b-audiovisual__title {
  overflow: visible;
  height: auto;
  padding-right: 0px;
}
</style>
