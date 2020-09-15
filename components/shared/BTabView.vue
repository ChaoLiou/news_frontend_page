<template>
  <div class="b-tab-view">
    <div
      ref="tabs"
      class="b-tab-view__tabs"
      :style="{ gridTemplateColumns: `repeat(${source.length}, max-content)` }"
    >
      <div
        :class="['b-tab-view__tab', selected(item) ? 'b-tab-view__tab_selected' : '']"
        v-for="(item, index) in source"
        :key="`tab-${index}`"
        @click="selectedTab = item"
      >
        <slot name="tab" :item="item" />
      </div>
    </div>
    <div class="b-tab-view__tab-items">
      <div
        v-show="selectedTab.id === item.id"
        v-for="(item, index) in source"
        :key="`tab-item-${index}`"
      >
        <slot name="tab-item" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selectedTab: undefined,
    };
  },
  mounted() {
    const tabs = this.$refs.tabs;
    this.$emit("ready", { tabsHeight: tabs.offsetHeight });
  },
  methods: {
    selected(item) {
      return this.selectedTab && this.selectedTab.id === item.id;
    },
  },
  watch: {
    source: {
      immediate: true,
      handler(value) {
        this.selectedTab = value[0];
      },
    },
  },
};
</script>

<style scoped>
.b-tab-view {
  position: relative;
}
.b-tab-view__tabs {
  display: grid;
  width: 100vw;
  overflow-x: scroll;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2;
  background-color: white;
}
.b-tab-view__tab {
  margin: 6.5px 15px;
}
.b-tab-view__tab > *:first-child {
  font-size: 1.2em;
  font-weight: bold;
  padding: 7.5px 10px;
  white-space: nowrap;
}
.b-tab-view__tab_selected {
  border-bottom: 2px solid #26d07c;
}
.b-tab-view__tab-items {
  margin-top: 55px;
}
</style>
