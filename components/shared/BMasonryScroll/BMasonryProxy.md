### 範例

#### 基本

```html
<template>
  <div style="width:100%;height:300px;overflow:scroll;position:relative">
    <div style="position:sticky;top:0px;left:0px">
      請往下捲... {{loadedMore ? "項目代理觸發 'load-more' 了" : ""}}
    </div>
    <div style="width:100%;height:1000px"></div>
    <b-masonry-proxy load-more-triggerable @load-more="loadMore">
      我是項目代理
    </b-masonry-proxy>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loadedMore: false
      };
    },
    methods: {
      loadMore() {
        this.loadedMore = true;
      }
    }
  };
</script>
```
