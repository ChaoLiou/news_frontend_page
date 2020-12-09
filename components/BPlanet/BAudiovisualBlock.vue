<template>
  <div
    :class="[
      'b-audiovisual-block',
      masonry ? 'b-audiovisual-block_masonry' : '',
    ]"
  >
    <div v-if="titleLabel">
      <div class="b-audiovisual-block__title">{{ titleLabel }}</div>
    </div>
    <div>
      <b-masonry-scroll-using-grid
        v-if="masonry"
        :items="source"
        :loading="loading"
        :column="1"
        :auto-adjust-height="false"
        ref="bMasonryScroll"
        @load-more="loadMore"
      >
        <template #default="props">
          <b-audiovisual :data="props.item" />
        </template>
        <template #nomore>
          <div class="no-more-content">沒有更多影片了</div>
        </template>
      </b-masonry-scroll-using-grid>
      <b-horizontal-scroll
        v-else
        :loading="loading"
        :placeholder-style="{
          height: '230px',
          width: '320px',
          marginRight: '16px',
          borderRadius: '20px',
        }"
      >
        <template v-for="(item, index) in source">
          <b-audiovisual-card :key="index" :data="item" @navigate="navigate" />
        </template>
      </b-horizontal-scroll>
    </div>
  </div>
</template>

<script>
import { checkAppExist, openFullH5Webview } from "@/assets/js/beanfun";
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
    topPriorityId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      source: [],
      loading: false,
    };
  },
  methods: {
    init() {
      this.loading = true;
      this.source = [];
      this.resetScroll();
      this.loadMore();
    },
    resetScroll() {
      if (this.$refs.bMasonryScroll) {
        this.$refs.bMasonryScroll.reset();
      }
    },
    loadMoreVideo(list, pageIndex) {
      if (list) {
        if (pageIndex === 1) {
          if (this.topPriorityId) {
            const isTopPriorityId = (id) => id === this.topPriorityId;
            const topPriority = list.find((x) => isTopPriorityId(x.id));
            const listExcludeTopPriority = list.filter(
              (x) => !isTopPriorityId(x.id)
            );
            this.source.push(topPriority);
            this.source.push(...listExcludeTopPriority);
            return;
          }
        }
        this.source.push(...list);
      }
    },
    loadMore({ pageSize, pageIndex } = { pageSize: 10, pageIndex: 1 }) {
      this.loading = true;
      const payload = {
        pageIndex,
        pageSize,
        planetId: this.planetId,
      };
      this.$store
        .dispatch("audiovisual/fetch", payload)
        .then((list) => this.loadMoreVideo(list, pageIndex))
        .then(() => (this.loading = false))
        .catch((_) => (this.loading = false));
    },
    navigate(data) {
      const isHashMode = this.$router.mode === "hash";
      let link = `${location.origin}/`;
      if (isHashMode) {
        link += "#/";
      }
      link += `${this.planetId}/audiovisual/${data.id}`;
      const { officialAccountId } = this.$store.getters["serverEnv/env"];
      checkAppExist(
        () => {
          openFullH5Webview(
            link,
            data.representativePlanet.name,
            officialAccountId
          );
        },
        () => {
          window.open(link, "_blank");
        }
      );
    },
  },
  watch: {
    planetId: {
      immediate: true,
      handler() {
        this.init();
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
.no-more-content {
  width: 100%;
  background-color: #262626;
  color: white;
  text-align: center;
}
</style>
