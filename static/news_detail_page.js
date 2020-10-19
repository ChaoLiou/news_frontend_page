const parts = location.pathname.split("/").filter(v => !!v);

const config = {
  news_API: "https://stg-news-api.beanfun.com/v1",
  id: "" || parts[parts.length - 2],
  defaultImg: "/news_detail_img_default.png",
  scripts: [
    {
      src:
        // "https://beangochat.blob.core.windows.net/beango-static-prod/sdk/beango.min.js",
        "https://beangostg.blob.core.windows.net/beango-static-stg/sdk/beanfun.min.js",
      onload: beanfunOnLoad
    },
    {
      src:
        "https://beangochat.blob.core.windows.net/beango-static-prod/sdk/vconsole.min.js",
      onload: vConsoleOnLoad
    },
    { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js", onload: vueOnload }
  ]
};
const bodyDOM = document.querySelector("body");

includeScriptSources();
init();

function beanfunOnLoad() {
  console.log("beanfunOnLoad");
}

function vConsoleOnLoad() {
  console.log("vConsoleOnLoad");
  new VConsole();
}

function vueOnload() {
  console.log("vueOnload");
  initRecommends();
}

function includeScriptSources() {
  const headDOM = document.querySelector("head");
  config.scripts.forEach(script => {
    const scriptDOM = createElement("script", { src: script.src });
    scriptDOM.onload = script.onload;
    headDOM.append(scriptDOM);
  });
}

function init() {
  initToolMenu();

  fetch(config.news_API + "/news?id=" + config.id)
    .then(res => res.json())
    .then(json =>
      typeof json.data === typeof [] && json.data.length > 0
        ? initHeaderAndDetail(json.data[0])
        : console.error("data not found")
    )
    .catch(err => console.error(err));
}

function initToolMenu() {
  const insideSharingTextDOM = createElement("div", {
    class: "tool-menu__text"
  });
  insideSharingTextDOM.textContent = "轉傳";
  const insideSharingDOM = createElement(
    "div",
    {
      class: "tool-menu__inside-sharing"
    },
    [createElement("div", { class: "tool-menu__icon" }), insideSharingTextDOM]
  );
  const outsideSharingTextDOM = createElement("div", {
    class: "tool-menu__text"
  });
  outsideSharingTextDOM.textContent = "分享";
  const outsideSharingDOM = createElement(
    "div",
    {
      class: "tool-menu__outside-sharing"
    },
    [createElement("div", { class: "tool-menu__icon" }), outsideSharingTextDOM]
  );
  const toolMenuDOM = createElement(
    "div",
    {
      class: "tool-menu"
    },
    [insideSharingDOM, outsideSharingDOM]
  );
  bodyDOM.prepend(toolMenuDOM);
}

function initHeaderAndDetail(data) {
  console.log(data);
  const sourceTitleDOM = document.querySelector(".header__source-title");
  sourceTitleDOM.textContent = data.src_site.description;
  const datetimeInfoDOM = document.querySelector(".header__published-updated");
  datetimeInfoDOM.textContent =
    formatPublishedText(data.src_publish_time_unix) +
    " " +
    formatUpdatedText(data.src_update_time_unix);
  const recommendsTitle = document.querySelector(".recommends__title");
  recommendsTitle.textContent = "你可能會喜歡";
  bindEvents(data);
}

function initBMasonryProxy() {
  Vue.component("b-masonry-proxy", {
    template: `
<div class="b-masonry-proxy">
  <slot></slot>
</div>`,
    props: {
      triggerLoadingMore: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        observer: undefined
      };
    },
    mounted() {
      if (this.triggerLoadingMore) {
        this.observer = new IntersectionObserver(this.handleScroll, {
          root: null,
          threshold: 0
        });
        this.observer.observe(this.$el);
      }
    },
    methods: {
      handleScroll(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.$emit("load-more");
          }
        });
      }
    },
    watch: {
      triggerLoadingMore(value) {
        if (!value) {
          this.observer.disconnect();
          this.observer = undefined;
        }
      }
    }
  });
}

function initBMasonryScroll() {
  Vue.component("b-masonry-scroll", {
    template: `
<div class="b-masonry-scroll">
    <b-masonry-proxy
      v-for="(item, index) in items"
      :key="index"
      :class="{ 'trigger-loading-more': triggerable(index) }"
      :trigger-loading-more="triggerable(index)"
      :style="{
        gridRowEnd: gridRowEnd(index),
      }"
      @heightChanged="(height) => heightChanged(index, height)"
      @load-more="loadMore(index)"
    >
      <slot :item="{ ...item, index }"></slot>
    </b-masonry-proxy>
    <template v-if="loading">
      <div
        class="b-masonry-scroll__placeholder"
        :style="{
          gridRowEnd: gridRowEnd(index),
        }"
        v-for="index in rowSpans.length"
        :key="'placeholder-' + index"
      ></div>
    </template>
    <div class="b-masonry-scroll__no-more" v-else>
      <slot name="nomore" />
    </div>
</div>`,
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      loading: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        rowSpans: [],
        observer: undefined,
        pageIndex: 1,
        pageSize: 10
      };
    },
    mounted() {
      this.rowSpans = Array.from({ length: this.items.length }, (v, i) => 0);
    },
    methods: {
      gridRowEnd(index) {
        return this.rowSpans.length > 0
          ? `span ${this.rowSpans[index] ? this.rowSpans[index] : "10"}`
          : `span 10`;
      },
      triggerable(index) {
        return (index + 1) % (this.pageSize / 2) === 0;
      },
      heightChanged(index, height) {
        this.$set(this.rowSpans, index, Math.ceil((height + 10) / 20));
      },
      loadMore(index) {
        if (index + 1 === this.pageIndex * this.pageSize) {
          this.$emit("load-more", {
            pageSize: this.pageSize,
            pageIndex: ++this.pageIndex
          });
        }
      }
    }
  });
}

function initBNews() {
  Vue.component("b-news", {
    template: `
  <div class="b-news" @click="toWebview">
  <a :href="link">
    <div class="b-news__card">
      <div class="b-news__thumbnail">
        <img
          class="b-news__thumbnail-img-2"
          :src="thumbnail"
          @load="heightChanged"
        />
      </div>
      <div class="b-news__info">
        <div class="b-news__source">{{ source }}</div>
        <div class="b-news__title">{{ titleLabel }}</div>
      </div>
    </div>
  </a>
  </div>`,
    props: {
      link: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      source: {
        type: String,
        default: ""
      },
      titleLabel: {
        type: String,
        default: ""
      },
      poll: {
        type: Boolean,
        default: false
      },
      pageLink: {
        type: String,
        default: ""
      },
      link: {
        type: String,
        default: ""
      }
    },
    mounted() {
      window.addEventListener("resize", this.heightChanged);
    },
    methods: {
      toWebview() {
        // BGO.open_full_h5_webview(this.link, this.planetTitle);
      },
      heightChanged() {
        if (this.$el.offsetHeight > 0) {
          this.$parent.$emit("heightChanged", this.$el.offsetHeight);
        }
      }
    }
  });
}

function initRecommends() {
  initBMasonryProxy();
  initBMasonryScroll();
  initBNews();
  new Vue({
    el: ".masonry-scroll",
    template: `
  <b-masonry-scroll
    :loading="loading"
    :items="arr_source"
    @load-more="loadMore"
    ref="bMasonryScroll"
  >
    <template #default="props">
      <b-news
        :thumbnail="props.item.img"
        :title-label="props.item.title"
        :source="props.item.source"
        :poll="props.item.poll"
        :page-link="props.item.pageLink"
        :link="props.item.link"
      />
    </template>
    <template #nomore>沒有更多新聞了</template>
  </b-masonry-scroll>`,
    data() {
      return {
        arr_source: [],
        loading: true
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.loading = true;
        this.arr_source = [];
        this.loadMore();
      },
      loadMoreNews(list, pageIndex) {
        if (list) {
          if (pageIndex === 1) {
            this.arr_source = [];
          }
          this.arr_source.push(...list);
        }
        this.loading = false;
      },
      loadMore({ pageSize, pageIndex } = { pageSize: 10, pageIndex: 1 }) {
        this.loading = true;
        const apiRelative = `news?page=${pageIndex}&pageSize=${pageSize}&timestamp=${Date.now()}&bannerID=2`;
        get(apiRelative)
          .then(json => this.loadMoreNews(json.data.map(formatNews), pageIndex))
          .catch(err => {
            console.error(err);
            this.loading = false;
          });
      }
    }
  });
}

function get(apiRelative) {
  const url = `${config.news_API}/${apiRelative}`;
  return fetch(url, {
    mode: "cors"
  }).then(res => res.json());
}

function formatNews(news) {
  return {
    img: news.Images.length > 0 ? news.Images[0].file_path : undefined,
    title: news.src_title,
    source: "Nownews",
    poll: false,
    pageLink: "",
    link: news.article_path
  };
}

function bindEvents(data) {
  const insideSharingDOM = document.querySelector(".tool-menu__inside-sharing");
  const outsideSharingDOM = document.querySelector(
    ".tool-menu__outside-sharing"
  );
  // const link = `${location.origin}/articles/tw/1/1315985892283793408/detail.html`;
  const link = data.article_path;
  const widgetId = "5f55f91c53b8fe00073e2905";
  const deepLink = `beanfunapp://Q/h5/w_id/${widgetId}?url=${encodeURIComponent(
    link
  )}`;
  console.log(encodeURIComponent(link));
  const image = data.Images[0].file_path;
  console.log({ link, widgetId, deepLink, image });
  insideSharingDOM.addEventListener("click", () => {
    const msg_body = {
      messages: [
        {
          raw_message: {
            mime_type: 81,
            content: data.src_title + "\n" + link,
            metadata: {
              application_x_beanfun_interactive_metadata: {
                service_id: widgetId,
                image_info: {
                  mime_type: 10,
                  uri: image,
                  thumbnail_uri: image
                },
                once: false,
                forwardable: true,
                expired_hint: "新聞過期",
                options: [
                  {
                    opt_key: "app_link_option_key",
                    opt_type: 3,
                    description: data.src_title,
                    uri: data.article_path
                  }
                ],
                interactive_key: "sdk_interactive_key"
              }
            },
            expired_time: -1
          }
        }
      ]
    };
    const select_opt = {
      title: "轉傳至",
      target: {
        friend: 1,
        group: 1,
        fun_chat: 1,
        nickname_group: 1,
        game: 1
      },
      max_selected_count: -1
    };
    console.log({ msg_body, select_opt });
    BGO.send_message_v2(msg_body, select_opt, result => {
      console.log(result);
    });
  });
  outsideSharingDOM.addEventListener("click", () => {
    const defaultLink = `https://beanfunstor.blob.core.windows.net/redirect/appCheck.html?url=${encodeURIComponent(
      deepLink
    )}`;
    const body = {
      seo: {
        title: data.src_title,
        description: data.src_title,
        image
      },
      defaultLink
    };

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Basic YmVhbmZ1bjpleUpqYjJSbGJtRnRaU0k2SW1KbFlXNW1kVzRpTENKaGIzUjBaWEpKWkNJNklqVmpOR1ptWlRZd05XTmhabVEwTURjME16bG1aRFJpWmlJc0luUnpJam94TlRZMk9URTFOell4TlRnMGZRPT0="
    );
    console.log({ defaultLink, body, headers });
    fetchCORS("https://bean.fun/api/link/create_if_missing", {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(json => {
      console.log({ create_if_missing: json });
      if (json._id) {
        const shortenLink = `https://bean.fun/${json._id}`;
        BGO.send_data_to_apps({
          text: `我在beanfun! 看到這個有趣的新聞! 一起來看新聞吧!\n\n${shortenLink}`
        });
      } else {
        console.error("_id is not found");
      }
    });
  });
}

function fetchCORS(url, { method, headers, body }, cb) {
  const cors_api_url = "https://cors-anywhere.herokuapp.com";
  return fetch(`${cors_api_url}/${url} `, {
    method,
    headers,
    body
  }).then(res => res.json());
}

function createElement(tagName, options, childList) {
  const DOM = document.createElement(tagName);
  if (options.class) {
    DOM.classList.add(options.class);
  }
  if (options.text) {
    DOM.textContent = options.text;
  }
  if (options.href) {
    DOM.href = options.href;
  }
  if (options.target) {
    DOM.target = options.target;
  }
  if (options.src) {
    DOM.src = options.src;
  }
  if (childList) {
    for (let index = 0; index < childList.length; index++) {
      DOM.append(childList[index]);
    }
  }
  return DOM;
}

function formatDateObj(milliseconds) {
  const dateObj = formatNativeDateObj(milliseconds);
  const YY = dateObj.getFullYear();
  const MM = dateObj.getMonth() + 1;
  const dd = dateObj.getDate();
  const hh = dateObj.getHours();
  const mm = dateObj.getMinutes();
  const date = `${YY}/${MM >= 10 ? MM : "0" + MM}/${dd >= 10 ? dd : "0" + dd}`;
  const time = `${hh}:${mm >= 10 ? mm : "0" + mm}`;
  return {
    date,
    time,
    datetime: `${date} ${time}`
  };
}

function transformMilliseconds(ms) {
  const dateObj = new Date(ms);
  const nowDateObj = new Date();
  if (sameDate(dateObj, nowDateObj)) {
    if (sameDateHours(dateObj, nowDateObj)) {
      return (
        Math.abs(nowDateObj.getMinutes() - dateObj.getMinutes()) + "分鐘前"
      );
    } else {
      return Math.abs(nowDateObj.getHours() - dateObj.getHours()) + "小時前";
    }
  } else {
    return Math.abs(nowDateObj.getDate() - dateObj.getDate()) + "天前";
  }
}

function sameDateHours(dateObj1, dateObj2) {
  return dateObj1.getHours() === dateObj2.getHours();
}

function sameDate(dateObj1, dateObj2) {
  return (
    dateObj1.getFullYear() === dateObj2.getFullYear() &&
    dateObj1.getMonth() === dateObj2.getMonth() &&
    dateObj1.getDate() === dateObj2.getDate()
  );
}

function formatPublishedText(ms) {
  const result = transformMilliseconds(ms);
  return "更新於 " + result;
}

function formatUpdatedText(ms) {
  const result = transformMilliseconds(ms);
  return "發佈於 " + result;
}
