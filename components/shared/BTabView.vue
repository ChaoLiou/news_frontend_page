<template>
  <div class="b-tab-view">
    <div
      ref="tabBar"
      class="b-tab-view__title"
      :style="{ gridTemplateColumns: `repeat(${source.length}, max-content)` }"
    >
      <div
        :class="[
          'b-tab-view__tab',
          isSelected(item) ? 'b-tab-view__tab_selected' : ''
        ]"
        v-for="(item, index) in source"
        :key="`tab-${index}`"
        @click="switchTab(item)"
      >
        <!--
        @slot 頁籤項目
        @binding {Object} item 結構如同 source 陣列中的物件
        -->
        <slot name="tab" :item="item" />
      </div>
    </div>
    <div class="b-tab-view__view">
      <div>
        <!--
        @slot 頁籤內容
        @binding {Object} item 已選取的頁籤, 結構如同 source 陣列中的物件
        -->
        <slot name="tab-item" :item="selectedTab" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 分頁檢視
 */
export default {
  props: {
    /**
     * 分頁項目的物件陣列, 可自訂結構
     */
    source: {
      type: Array,
      default() {
        return [{ id: "tab_1" }, { id: "tab_2" }, { id: "tab_3" }];
      }
    },
    /**
     * 在自訂結構的物件中, 從中選出一個 key 用於識別分頁項目(若使用預設值 `"id"`, 請確認自訂結構中有此屬性且是唯一值)
     */
    identifierKey: {
      type: String,
      default: "id"
    }
  },
  data() {
    return {
      selectedTab: undefined
    };
  },
  mounted() {
    const tabBar = this.$refs.tabBar;
    if (tabBar) {
      /**
       * TabView mounted
       * @property {Object} tabInfo { tabBarDOM: tab bar 的 dom, selectedTab: 已選取的 tab }
       */
      this.$emit("ready", { tabBarDOM: tabBar, selectedTab: this.selectedTab });
    }
  },
  methods: {
    switchTab(item) {
      if (this.selectedTab[this.identifierKey] !== item[this.identifierKey]) {
        /**
         * 切換頁籤
         * @property {Object} item 已選取的 tab, 自訂結構
         */
        this.$emit("switch-tab", item);
        this.selectedTab = item;
        this.$router.history.replace({
          name: this.name,
          hash: `#${item[this.identifierKey]}`
        });
      }
    },
    isSelected(item) {
      return (
        this.selectedTab &&
        this.selectedTab[this.identifierKey] &&
        item[this.identifierKey] &&
        this.selectedTab[this.identifierKey] === item[this.identifierKey]
      );
    }
  },
  watch: {
    source: {
      immediate: true,
      handler(value) {
        if (!value || value.length === 0) return;

        if (this.$route && this.$route.hash) {
          const hash = this.$route.hash;
          const id = parseInt(hash.substr(1));
          const target = value.find(x => id === x[this.identifierKey]);
          if (target) {
            this.selectedTab = target;
            return;
          }
        }
        this.selectedTab = value[0];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.b-tab-view {
  position: relative;
  &__title {
    display: grid;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    position: sticky;
    top: 0px;
    left: 0px;
    z-index: 99;
    background-color: #ffffff;
  }
  &__tab {
    margin: 6.5px 15px;
    &:hover {
      cursor: pointer;
    }
    & > *:first-child {
      font-size: 1.2em;
      font-weight: bold;
      padding-top: 7.5px;
      padding-bottom: 7.5px;
      margin: 0px 10px;
      white-space: nowrap;
    }
    &_selected > div {
      border-bottom: 2px solid #26d07c;
      color: #26d07c;
    }
  }
}
</style>
