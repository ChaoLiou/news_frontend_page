### 範例

#### 基本

```html
<template>
  <b-audiovisual-card :data="data" @navigate="navigate" />
</template>
<script>
  export default {
    data() {
      return {
        data: {
          id: "1234567890123456789",
          videoId: "M7lc1UVf-VE",
          img: {
            url: "https://i.ytimg.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
            width: 640,
            height: 480
          },
          title: "YouTube Developers Live: Embedded Web Player Customization",
          datetime: new Date("2013-04-10T00:00:00.000Z"),
          planets: [
            {
              id: 1,
              name: "星球"
            }
          ],
          representativePlanet: {
            name: "星球"
          },
          categories: [
            {
              name: "分類"
            }
          ],
          representativeCategory: {
            name: "分類"
          },
          source: {
            rss: {
              id: 1,
              name: "Google Developers"
            },
            site: {
              id: 1,
              img:
                "https://www.gstatic.com/devrel-devsite/prod/veaa02889f0c07424beaa31d9bac1e874b6464e7ed7987fde4c94a59ace9487fa/developers/images/touchicon-180.png",
              name: "Google Developers"
            }
          },
          views: "2132132",
          description:
            "On this weeks show, Jeff Posnick covers everything you need to know about using player parameters to customize the YouTube iframe-embedded player.",
          index: 1,
          marked: true
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

#### 出現於 viewport

```html
<template>
  <div ref="container">
    <div style="width:fit-content;">
      請往下捲...{{showedUp ? message : ''}}
    </div>
    <div style="height:300px;overflow:scroll">
      <div style="height:1000px"></div>
      <b-audiovisual-card :data="data" @show-up="showUp" />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        message: "影音出現了!",
        showedUp: false,
        data: {
          id: "1234567890123456789",
          videoId: "M7lc1UVf-VE",
          img: {
            url: "https://i.ytimg.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
            width: 640,
            height: 480
          },
          title: "YouTube Developers Live: Embedded Web Player Customization",
          datetime: new Date("2013-04-10T00:00:00.000Z"),
          planets: [
            {
              id: 1,
              name: "星球"
            }
          ],
          representativePlanet: {
            name: "星球"
          },
          categories: [
            {
              name: "分類"
            }
          ],
          representativeCategory: {
            name: "分類"
          },
          source: {
            rss: {
              id: 1,
              name: "Google Developers"
            },
            site: {
              id: 1,
              img:
                "https://www.gstatic.com/devrel-devsite/prod/veaa02889f0c07424beaa31d9bac1e874b6464e7ed7987fde4c94a59ace9487fa/developers/images/touchicon-180.png",
              name: "Google Developers"
            }
          },
          views: "2132132",
          description:
            "On this weeks show, Jeff Posnick covers everything you need to know about using player parameters to customize the YouTube iframe-embedded player.",
          index: 1,
          marked: true
        }
      };
    },
    methods: {
      showUp(data) {
        this.$refs.container.scrollTop = 0;
        this.showedUp = true;
      }
    }
  };
</script>
```
