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

export const renderToolMenu = () => {
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
  document.body.prepend(toolMenuDOM);
};

export const renderSourceTitle = text => {
  const sourceTitleDOM = document.querySelector(".header__source-title");
  sourceTitleDOM.textContent = text;
};

export const renderDateTimeInfo = (published, updated) => {
  const datetimeInfoDOM = document.querySelector(".header__published-updated");
  const publishedText = `更新於 ${transformMilliseconds(published)}`;
  const updatedText = `發布於 ${transformMilliseconds(updated)}`;
  datetimeInfoDOM.innerHTML = `${publishedText}<br />${updatedText}`;
};

export const renderRecommendNewsTitle = text => {
  const recommendsTitle = document.querySelector(".recommends__title");
  recommendsTitle.textContent = text;
};
