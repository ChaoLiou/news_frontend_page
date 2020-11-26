<template>
  <div class="b-masonry-scroll" :style="style">
    <b-masonry-proxy
      v-for="(item, index) in items"
      :key="index"
      :class="{
        first: index === 0,
        'trigger-loading-more': triggerable(index),
      }"
      :trigger-loading-more="triggerable(index)"
      :style="{
        transform: getTranslateXY(index),
        width: `${itemWidth}px`,
      }"
      @heightChanged="(height) => heightChanged(index, height)"
      @load-more="loadMore(index)"
    >
      <slot :item="{ ...item, index }"></slot>
    </b-masonry-proxy>
    <template v-if="loading">
      <div
        class="b-masonry-scroll__placeholder"
        :style="{
          height: `${placeholderHeight}px`,
          top: pageIndex === 1 ? '0px' : undefined,
        }"
      >
        <div
          v-for="index in this.column"
          class="b-masonry-scroll__placeholder-group"
          :key="index"
        >
          <div
            class="b-masonry-scroll__placeholder-item"
            v-for="jndex in 5 - index"
            :key="`placeholder-${index}-${jndex}`"
          ></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="b-masonry-scroll__no-more">
        <slot name="nomore" />
      </div>
    </template>
  </div>
</template>

<script>
import BMasonryProxy from "../shared/BMasonryScroll/BMasonryProxy";
export default {
  components: {
    BMasonryProxy,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: true,
    },
    column: {
      type: Number,
      default: 2,
    },
    autoAdjustHeight: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      itemHeights: [],
      itemTops: [],
      itemLefts: [],
      groups: [],
      pageIndex: 1,
      pageSize: 10,
      arranged: false,
      placeholderHeight: 860,
      noMoreTextHeight: 30,
      gap: 10,
    };
  },
  computed: {
    style() {
      return {
        minHeight: "100vh",
        height:
          this.itemTops[this.items.length - 1] +
          this.itemHeights[this.items.length - 1] +
          (this.loading ? this.placeholderHeight : this.noMoreTextHeight) +
          "px",
      };
    },
    itemWidth() {
      return this.$el ? (this.$el.offsetWidth - this.gap) / 2 : 0;
    },
  },
  mounted() {
    this.groups = Array.from({ length: this.column }, (v, i) => ({
      index: i,
      maxHeight: 0,
      left: i * (this.itemWidth + this.gap),
    }));
  },
  methods: {
    getTranslateXY(index) {
      let x, y;
      if (index === 0) {
        x = y = 0;
      } else {
        const left = this.itemLefts[index];
        const top = this.itemTops[index];
        x = left;
        y = top;
      }
      return `translate(${x}px, ${y}px)`;
    },
    triggerable(index) {
      return (index + 1) % (this.pageSize / 2) === 0;
    },
    reset() {
      this.pageIndex = 1;
    },
    heightChanged(index, height) {
      this.$set(this.itemHeights, index, height);
      if (this.itemHeights.length === this.items.length) {
        this.arrangeItems();
      }
    },
    arrangeItems() {
      this.itemHeights.forEach((height, index) => {
        if (index < this.column) {
          const group = this.groups[index];
          this.$set(this.itemTops, index, 0);
          this.$set(this.itemLefts, index, group.left);
          this.$set(this.groups, index, {
            ...group,
            maxHeight: height + this.gap,
          });
        } else {
          let targetGroup = this.groups[0];
          this.groups.forEach((group) => {
            if (!group.index) return;
            if (group.maxHeight < targetGroup.maxHeight) {
              targetGroup = group;
            }
          });
          const updatedGroup = {
            ...targetGroup,
            maxHeight: targetGroup.maxHeight + height + this.gap,
          };
          this.$set(this.itemTops, index, targetGroup.maxHeight);
          this.$set(this.itemLefts, index, targetGroup.left);
          this.$set(this.groups, targetGroup.index, updatedGroup);
        }
      });
      this.arranged = true;
    },
    loadMore(index) {
      const lastIndex = this.pageIndex * this.pageSize - 1;
      const currentIndex = index + this.pageSize / 2;
      if (this.arranged && currentIndex === lastIndex) {
        this.$emit("load-more", {
          pageSize: this.pageSize,
          pageIndex: ++this.pageIndex,
        });
      }
    },
  },
};
</script>

<style scoped>
.b-masonry-scroll {
  position: relative;
}
.b-masonry-proxy {
  position: absolute;
  transition: "transform" 0.3s;
}
.b-masonry-proxy.first {
  z-index: 2;
}
.b-masonry-scroll__placeholder {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  width: 100%;
}
.b-masonry-scroll__placeholder,
.b-masonry-scroll__no-more {
  position: absolute;
  bottom: 0px;
}
.b-masonry-scroll__placeholder-group {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 10px;
}
.b-masonry-scroll__placeholder-group:nth-child(even) {
  height: calc(100% + 80px);
}
.b-masonry-scroll__placeholder-item {
  border-radius: 20px;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeload;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: #eeeeee;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 104px;
}
.b-masonry-scroll__no-more {
  display: grid;
  justify-content: center;
  width: 100%;
  color: #00000081;
}
@keyframes placeload {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
