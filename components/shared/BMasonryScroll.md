### 範例

#### 基本

```html
<div style="width:400px;height:600px;overflow:scroll;">
  <b-masonry-scroll />
</div>
```

#### 彩虹方塊

```html
<template>
  <div style="width:400px;height:600px;overflow:scroll;">
    <b-masonry-scroll
      :loading="false"
      :source="source"
      scroll-height="600px"
      @load-more="loadMore"
    >
      <template #default="props">
        <div :style="getBackgroundStyle(props.item)"></div>
      </template>
      <template #nomore>沒有彩虹方塊了</template>
    </b-masonry-scroll>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        colors: [
          "red",
          "orange",
          "yellow",
          "green",
          "blue",
          "indigo",
          "purple",
          "black",
          "grey",
          "white"
        ],
        source: []
      };
    },
    created() {
      this.source = this.generateItems();
    },
    methods: {
      loadMore({ pageSize, pageIndex }) {
        if (pageIndex < 5) {
          this.source.push(...this.generateItems());
        }
      },
      generateItems() {
        return this.colors.map((color, index) => {
          const randomHeight = 200 + Math.random(Date.now) * 100;
          return index === this.colors.length - 1
            ? {
                color1st: color,
                color2nd: this.colors[0],
                height: randomHeight
              }
            : {
                color1st: color,
                color2nd: this.colors[index + 1],
                height: randomHeight
              };
        });
      },
      getBackgroundStyle(item) {
        return {
          background: `linear-gradient(90deg, ${item.color1st}, ${item.color2nd})`,
          height: `${item.height}px`
        };
      }
    }
  };
</script>
```

#### 彩虹方塊 - 多列

```html
<template>
  <div style="height:600px;overflow:scroll;">
    <b-masonry-scroll
      :loading="false"
      :source="source"
      :column="4"
      scroll-height="600px"
      @load-more="loadMore"
    >
      <template #default="props">
        <div :style="getBackgroundStyle(props.item)"></div>
      </template>
      <template #nomore>沒有彩虹方塊了</template>
    </b-masonry-scroll>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        colors: [
          "red",
          "orange",
          "yellow",
          "green",
          "blue",
          "indigo",
          "purple",
          "black",
          "grey",
          "white"
        ],
        source: []
      };
    },
    created() {
      this.source = this.generateItems();
    },
    methods: {
      loadMore({ pageSize, pageIndex }) {
        if (pageIndex < 5) {
          this.source.push(...this.generateItems());
        }
      },
      generateItems() {
        return this.colors.map((color, index) => {
          const randomHeight = 200 + Math.random(Date.now) * 100;
          return index === this.colors.length - 1
            ? {
                color1st: color,
                color2nd: this.colors[0],
                height: randomHeight
              }
            : {
                color1st: color,
                color2nd: this.colors[index + 1],
                height: randomHeight
              };
        });
      },
      getBackgroundStyle(item) {
        return {
          background: `linear-gradient(90deg, ${item.color1st}, ${item.color2nd})`,
          height: `${item.height}px`
        };
      }
    }
  };
</script>
```
