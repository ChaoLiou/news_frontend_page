### 範例

#### 基本

```html
<template>
  <b-horizontal-scroll loading :placeholder-style="placeholderStyle">
  </b-horizontal-scroll>
</template>
<script>
  export default {
    data() {
      return {
        placeholderStyle: {
          width: "100px",
          height: "100px",
          backgroundColor: "#767676",
          marginRight: "4px"
        }
      };
    }
  };
</script>
```

#### 彩虹方塊

```html
<template>
  <b-horizontal-scroll>
    <div
      v-for="(pair, index) in colorpairs.concat(colorpairs)"
      :key="index"
      style="width:100px;height:100px;margin-right:4px;"
      :style="getBackgroundStyle(pair)"
    ></div>
  </b-horizontal-scroll>
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
          "black"
        ]
      };
    },
    computed: {
      colorpairs() {
        return this.colors.map((color, index) => {
          return index === this.colors.length - 1
            ? [color, this.colors[0]]
            : [color, this.colors[index + 1]];
        });
      }
    },
    methods: {
      getBackgroundStyle(colorpair) {
        return {
          background: `linear-gradient(90deg, ${colorpair[0]}, ${colorpair[1]})`
        };
      }
    }
  };
</script>
```
