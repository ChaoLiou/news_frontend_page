const parts = location.pathname.split("/").filter(v => !!v);

const config = {
  news_API: "https://753f40f86863.ngrok.io/v1",
  id: "" || parts[parts.length - 2],
  defaultImg: "/news_detail_img_default.png",
  scripts: [
    "https://beangostg.blob.core.windows.net/beango-static-stg/sdk/beanfun.min.js",
    "https://beangochat.blob.core.windows.net/beango-static-prod/sdk/vconsole.min.js"
  ]
};
const bodyDOM = document.querySelector("body");

includeScriptSources();
init();

function includeScriptSources() {
  const headDOM = document.querySelector("head");
  config.scripts.forEach(src =>
    headDOM.append(createElement("script", { src }))
  );
}

function init() {
  // VConsole = new VConsole();
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
  const insideSharingDOM = createElement(
    "div",
    {
      class: "tool-menu__inside-sharing"
    },
    [createElement("div", { class: "tool-menu__icon" })]
  );
  const outsideSharingDOM = createElement(
    "div",
    {
      class: "tool-menu__outside-sharing"
    },
    [createElement("div", { class: "tool-menu__icon" })]
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
  const sourceImgDOM = createElement("div", {
    class: "header__source-img"
  });
  sourceImgDOM.style.backgroundImage = "url('" + config.defaultImg + "')";
  const sourceTitleDOM = createElement("div", {
    class: "header__source-title",
    text: data.src_site.description
  });
  const publishedDOM = createElement("div", {
    class: "header__published-updated",
    text:
      formatPublishedText(data.src_publish_time_unix) +
      " " +
      formatUpdatedText(data.src_update_time_unix)
  });
  const titleDOM = document.querySelector(".title");
  titleDOM.classList.add("header__title");
  const textDOM = createElement("div", { class: "header__text-info" }, [
    sourceImgDOM,
    sourceTitleDOM,
    publishedDOM,
    titleDOM
  ]);
  const thumbnailDOM = createElement("div", { class: "header__thumbnail" });
  if (data.Images && data.Images.length > 0) {
    thumbnailDOM.style.backgroundImage =
      "url('" + data.Images[0].file_path + "')";
  }
  const headerDOM = createElement("div", { class: "header" }, [
    thumbnailDOM,
    textDOM
  ]);

  document
    .querySelector(".tool-menu")
    .insertAdjacentElement("afterend", headerDOM);

  const originalLinkDOM = createElement("a", {
    class: "footer__original-link",
    href: data.src_url,
    target: "blank",
    text: "前往"
  });

  const footerSourceImgDOM = createElement("div", {
    class: "footer__source-img"
  });
  footerSourceImgDOM.style.backgroundImage = "url('" + config.defaultImg + "')";
  const footerSourceTitleDOM = createElement("div", {
    class: "footer__source-title",
    text: data.src_site.description
  });
  const footerDOM = createElement("div", { class: "detail__footer" }, [
    footerSourceImgDOM,
    footerSourceTitleDOM,
    originalLinkDOM
  ]);
  const contentDOM = document.querySelector(".content");
  contentDOM.classList.add("detail__content");

  const detailDOM = createElement("div", { class: "detail" }, [
    contentDOM,
    footerDOM
  ]);

  document
    .querySelector(".header")
    .insertAdjacentElement("afterend", detailDOM);

  bindEvents(data);
}

function bindEvents(data) {
  const insideSharingDOM = document.querySelector(".tool-menu__inside-sharing");
  const outsideSharingDOM = document.querySelector(
    ".tool-menu__outside-sharing"
  );
  insideSharingDOM.addEventListener("click", () => {
    BGO.send_message_v2(
      {
        messages: [
          {
            promote_notification: "來自星球的新聞分享",
            raw_message: {
              mime_type: 80,
              content: data.src_title + " " + data.article_path
            }
          }
        ]
      },
      {
        title: "好友群",
        target: {
          friend: 1,
          group: 1,
          fun_chat: 1,
          nickname_group: 1,
          game: 1
        },
        max_selected_count: -1
      }
    );
  });
  outsideSharingDOM.addEventListener("click", () => {
    BGO.send_data_to_apps({
      text: data.src_title + " " + data.article_path
    });
  });
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
      return nowDateObj.getMinutes() - dateObj.getMinutes() + "分鐘前";
    } else {
      return nowDateObj.getHours() - dateObj.getHours() + "小時前";
    }
  } else {
    return nowDateObj.getDate() - dateObj.getDate() + "天前";
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
