### 範例

#### 基本

```html
<template>
  <b-tab-view :source="data" @ready="tabViewReady">
    <template #tab="props">
      <div>{{props.item.title}}</div>
    </template>
    <template #tab-item="props">
      <div
        style="height:500px;display:grid;justify-content:center;align-content:center;font-size:2em"
      >
        {{props.item.content}}
      </div>
    </template>
  </b-tab-view>
</template>
<script>
  export default {
    data() {
      return {
        data: [
          { id: "firstTab", title: "第一個頁籤", content: "第一個頁籤的內容" },
          { id: "secondTab", title: "第二個頁籤", content: "第二個頁籤的內容" },
          { id: "thirdTab", title: "第三個頁籤", content: "第三個頁籤的內容" }
        ]
      };
    },
    methods: {
      tabViewReady() {}
    }
  };
</script>
```
