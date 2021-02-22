import { transformMilliseconds } from "./formatter";
import { trackEvent } from "../assets/js/tracking";
import {
  click_direct_external_link,
  SPECIAL_EXTERNAL_LINK_NAME
} from "../assets/js/tracking/events";

export const createElement = (tagName, options = {}, childList = undefined) => {
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
};

export const renderToolMenu = (insideSharingText, outsideSharingText) => {
  const insideSharingTextDOM = createElement("div", {
    class: "tool-menu__text"
  });
  insideSharingTextDOM.textContent = insideSharingText;
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
  outsideSharingTextDOM.textContent = outsideSharingText;
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
  document.body.prepend(toolMenuDOM);
};

export const renderSource = source => {
  if (source) {
    const rss = source.rss;
    if (rss.logoImage) {
      const sourceImgDOM = document.querySelector(".header__source-img");
      sourceImgDOM.style.backgroundImage = `url("/${rss.logoImage}")`;
    }
    const sourceTitleDOM = document.querySelector(".header__source-title");
    sourceTitleDOM.textContent = rss.name;
  }
};

export const renderDateTimeInfo = (published, updated) => {
  const datetimeInfoDOM = document.querySelector(".header__published-updated");
  let publishedText = transformMilliseconds(published);
  let updatedText = transformMilliseconds(updated);
  if (!updated || publishedText === updatedText) {
    publishedText = `發布於  ${transformMilliseconds(published)}`;
    datetimeInfoDOM.innerHTML = `${publishedText}`;
  } else {
    updatedText = `更新於${transformMilliseconds(updated)}`;
    datetimeInfoDOM.innerHTML = `${updatedText}`;
  }
};

export const renderRecommendNewsTitle = text => {
  const recommendsTitle = document.querySelector(".recommends__title");
  recommendsTitle.textContent = text;
};

export const renderRecommendAdTitle = text => {
  const recommendAdsArea = document.querySelector(".ads");
  const recommendAdsTitle = createElement("div", { class: ".ads__title" });
  recommendAdsTitle.textContent = text;
  const recommendAdsContainer = createElement("div", {
    class: ".ads__container"
  });
  recommendAdsArea.append(recommendAdsTitle);
  recommendAdsArea.append(recommendAdsContainer);
};

export const renderSoureNewsLink = (text, news) => {
  const detailContainer = document.querySelector(".detail");
  const externalLinkIcon = createElement("div", {
    class: "detail__external-link-icon"
  });
  const aLink = createElement("a", { href: "javascript:;" });
  aLink.textContent = text;
  aLink.append(externalLinkIcon);
  detailContainer.append(
    createElement("div", { class: "detail__source-link" }, [aLink])
  );
  aLink.addEventListener("click", () => {
    Promise.resolve(
      trackEvent(
        click_direct_external_link.id,
        click_direct_external_link.category,
        click_direct_external_link.action,
        click_direct_external_link.formatPayload(
          news.id,
          news.source.site.id,
          news.source.site.name,
          news.source.rss.id,
          news.source.rss.name,
          news.representativeCategory.name,
          news.link,
          news.title,
          SPECIAL_EXTERNAL_LINK_NAME.view_original_article,
          news.externalLink
        )
      )
    );
  });
};

export const toggleToolMenuItemForLoading = selector => {
  const menuItemDOM = document.querySelector(selector);
  if (menuItemDOM) {
    if (menuItemDOM.classList.contains("loading")) {
      menuItemDOM.classList.remove("loading");
    } else {
      menuItemDOM.classList.add("loading");
    }
  }
};
