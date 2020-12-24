### 範例

#### 基本

```html
<template>
  <b-ad-card :data="data" @navigate="navigate" />
</template>
<script>
  export default {
    data() {
      return {
        data: {
          img: "https://i.ytimg.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
          title: "YouTube Developers Live: Embedded Web Player Customization",
          link: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
          salePrice: 888,
          price: 999,
          discounted: true
        }
      };
    },
    methods: {
      navigate(data) {
        alert(`navigate,\n` + JSON.stringify(data, undefined, 4));
      }
    }
  };
</script>
```
