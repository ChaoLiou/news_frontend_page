### 範例

#### 基本

```html
<template>
  <b-news-card :data="data" style="width:300px" @navigate="navigate" />
</template>
<script>
  export default {
    data() {
      return {
        data: {
          id: "1234567890123456789",
          title: "YouTube Developers Live: Embedded Web Player Customization",
          updateTimeUnix: 1608282862400,
          publishTimeUnix: 1608282862400,
          link: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
          externalLink: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
          img: "https://i.ytimg.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
          source: {
            rss: {
              id: 1,
              name: "Google Developers",
              logoImage:
                "https://www.gstatic.com/devrel-devsite/prod/veaa02889f0c07424beaa31d9bac1e874b6464e7ed7987fde4c94a59ace9487fa/developers/images/touchicon-180.png"
            },
            site: {
              id: 1,
              name: "Google Developers"
            }
          },
          representativePlanet: { id: 1, name: "星球" },
          representativeCategory: { id: 1, name: "分類" },
          categories: [{ name: "Google" }],
          description:
            "On this weeks show, Jeff Posnick covers everything you need to know about using player parameters to customize the YouTube iframe-embedded player.",
          index: 1,
          recommendation: true
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

#### 固定圖片高度

```html
<template>
  <b-news-card
    :data="data"
    :auto-img-height="false"
    default-img-height="300px"
    style="width:300px"
    @navigate="navigate"
  />
</template>
<script>
  export default {
    data() {
      return {
        data: {
          id: "1234567890123456789",
          title: "YouTube Developers Live: Embedded Web Player Customization",
          updateTimeUnix: 1608282862400,
          publishTimeUnix: 1608282862400,
          link: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
          externalLink: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
          img: "https://i.ytimg.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
          source: {
            rss: {
              id: 1,
              name: "Google Developers",
              logoImage:
                "https://www.gstatic.com/devrel-devsite/prod/veaa02889f0c07424beaa31d9bac1e874b6464e7ed7987fde4c94a59ace9487fa/developers/images/touchicon-180.png"
            },
            site: {
              id: 1,
              name: "Google Developers"
            }
          },
          representativePlanet: { id: 1, name: "星球" },
          representativeCategory: { id: 1, name: "分類" },
          categories: [{ name: "Google" }],
          description:
            "On this weeks show, Jeff Posnick covers everything you need to know about using player parameters to customize the YouTube iframe-embedded player.",
          index: 1,
          recommendation: true
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
