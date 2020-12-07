import { transformMilliseconds } from "./formatter";

export const createElement = (tagName, options, childList) => {
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

export const renderSourceTitle = text => {
  const sourceTitleDOM = document.querySelector(".header__source-title");
  sourceTitleDOM.textContent = text;
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

export const renderSoureNewsLink = (text, link) => {
  const detailContainer = document.querySelector(".detail");
  const externalLinkIcon = createElement("div", {
    class: "detail__external-link-icon"
  });
  const aLink = createElement("a", { href: link });
  aLink.textContent = text;
  aLink.append(externalLinkIcon);
  detailContainer.append(
    createElement("div", { class: "detail__source-link" }, [aLink])
  );
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
