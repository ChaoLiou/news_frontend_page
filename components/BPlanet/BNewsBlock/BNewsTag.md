### 範例

#### 基本

```html
<template>
  <b-news-tag
    title-text="全部"
    style="width:50px"
    :selected="selected"
    @toggle="selected = !selected"
  />
</template>
<script>
  export default {
    data() {
      return {
        selected: true
      };
    }
  };
</script>
```
