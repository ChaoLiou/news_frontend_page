/**
 * 星球畫面出現
 */
export const view_landing_page = {
  id: 800,
  /**
   *
   * @param {string} planetName 星球名稱
   */
  formatPayload(planetName) {
    return validate.call(this, {
      pg_name: planetName
    });
  },
  category: "planet",
  action: "view_landing_page"
};
/**
 * 星球首頁內容曝光
 */
export const impression_landing_page = {
  id: 801,
  /**
   *
   * @param {Array<object>} list 新聞/影音 Array, 物件包含以下 fields:
   * @param {string} ids 新聞/影音 field - Id
   * @param {string} blockType 新聞/影音 field - 區塊名稱, 使用 BLOCK_TYPE.XX 指定
   * @param {string} categoryName 新聞/影音 field - 分類名稱
   * @param {string} planetName 新聞/影音 field - 星球名稱
   * @param {number} siteId 新聞/影音 field - 站台 Id
   * @param {string} siteName 新聞/影音 field - 站台名稱
   * @param {number} rssId 新聞/影音 field - RSS Id
   * @param {string} rsstName 新聞/影音 field - RSS 名稱
   * @param {number} index 新聞/影音 field - Index
   */
  formatPayload(list) {
    return validate.call(
      this,
      list.map(item => ({
        uuid: item.id,
        section: item.blockType,
        category: item.categoryName,
        pg_name: item.planetName,
        content_provider_id: item.siteId,
        content_provider: item.siteName,
        source_fetch_id: item.rssId,
        source_fetch: item.rssName,
        pos: item.index
      }))
    );
  },
  category: "planet",
  action: "impression_landing_page"
};
/**
 * 點擊星球情報類別
 */
export const click_news_category = {
  id: 802,
  /**
   *
   * @param {string} planetName 星球名稱
   * @param {string} categoryName 分類名稱
   * @param {number} categoryIndex 分類 Index
   */
  formatPayload(planetName, categoryName, categoryIndex) {
    return validate.call(this, {
      pg_name: planetName,
      category: categoryName,
      pos: categoryIndex
    });
  },
  category: "planet",
  action: "click_news_category"
};
/**
 * 點擊星球情報內新聞
 */
export const click_news = {
  id: 803,
  /**
   *
   * @param {string} planetName 星球名稱
   * @param {string} categoryName 分類名稱
   * @param {string} detailPageLink 詳細頁網址
   * @param {string} newsTitle 新聞標題
   * @param {string} newsId 新聞 Id
   * @param {number} newsIndex 新聞 Index
   * @param {number} newsIndex 新聞 Index
   * @param {number} siteId 站台 Id
   * @param {string} siteName 站台名稱
   * @param {number} rssId RSS Id
   * @param {string} rssName RSS 名稱
   */
  formatPayload(
    planetName,
    categoryName,
    detailPageLink,
    newsTitle,
    newsId,
    newsIndex,
    siteId,
    siteName,
    rssId,
    rssName
  ) {
    return validate.call(this, {
      pg_name: planetName,
      category: categoryName,
      url: detailPageLink,
      title: newsTitle,
      uuid: newsId,
      pos: newsIndex,
      content_provider_id: siteId,
      content_provider: siteName,
      source_fetch_id: rssId,
      source_fetch: rssName
    });
  },
  category: "planet",
  action: "click_news"
};
/**
 * 點擊星球上方tab
 */
export const click_tab = {
  id: 804,
  /**
   *
   * @param {string} planetName 星球名稱
   */
  formatPayload(planetName) {
    return validate.call(this, {
      pg_name: planetName
    });
  },
  category: "planet",
  action: "click_tab"
};
/**
 * 新聞文章頁面出現
 */
export const view_news_page = {
  id: 805,
  /**
   *
   * @param {string} newsId 新聞 Id
   * @param {number} siteId 站台 Id
   * @param {string} siteName 站台名稱
   * @param {number} rssId RSS Id
   * @param {string} rssName RSS 名稱
   * @param {string} categoryName 分類名稱
   * @param {string} newsLink 新聞內頁網址
   * @param {string} newsTitle 新聞標題
   */
  formatPayload(
    newsId,
    siteId,
    siteName,
    rssId,
    rssName,
    categoryName,
    newsLink,
    newsTitle
  ) {
    return validate.call(this, {
      uuid: newsId,
      content_provider_id: siteId,
      content_provider: siteName,
      source_fetch_id: rssId,
      source_fetch: rssName,
      category: categoryName,
      url: newsLink,
      title: newsTitle
    });
  },
  category: "planet",
  action: "view_news_page"
};
/**
 * 影音頁面出現
 */
export const impression_video_page = {
  id: 806,
  /**
   *
   * @param {Array<object>} videos 影音 Array, 物件包含以下 fields:
   * @param {string} id 影音 field - Id
   * @param {number} siteId 影音 field - 站台 Id
   * @param {string} siteName 影音 field - 站台名稱
   * @param {number} rssId 影音 field - RSS Id
   * @param {string} rssName 影音 field - RSS 名稱
   * @param {string} categoryName 影音 field - 分類名稱
   * @param {string} videoLink 影音 field - 內頁網址
   * @param {string} videoTitle 影音 field - 標題
   * @param {string} planetName 影音 field - 星球名稱
   */
  formatPayload(videos) {
    return validate.call(
      this,
      videos.map(video => ({
        uuid: video.id,
        content_provider_id: video.siteId,
        content_provider: video.siteName,
        source_fetch_id: video.rssId,
        source_fetch: video.rssName,
        category: video.categoryName,
        url: video.videoLink,
        title: video.videoTitle,
        pg_name: video.planetName
      }))
    );
  },
  category: "planet",
  action: "impression_video_page"
};
/**
 * [DEPRECATED] 滑動快充影音banner
 */
export const swipe_banner = {
  id: 807,
  /**
   *
   * @param {string} videoId 影音 Id
   * @param {number} videoIndex 影音 Index
   */
  formatPayload(videoId, videoIndex) {
    return validate.call(this, {
      uuid: videoId,
      pos: videoIndex
    });
  },
  category: "planet",
  action: "swipe_banner"
};
/**
 * 點擊Landing Page影音
 */
export const click_video = {
  id: 808,
  /**
   *
   * @param {string} videoId 影音 Id
   * @param {number} videoIndex 影音 Index
   * @param {number} siteId 站台 Id
   * @param {string} siteName 站台名稱
   * @param {number} rssId RSS Id
   * @param {string} rssName RSS 名稱
   * @param {string} categoryName 分類名稱
   * @param {string} newsLink 內頁網址
   * @param {string} newsTitle 標題
   * @param {string} planetName 星球名稱
   */
  formatPayload(
    videoId,
    videoIndex,
    siteId,
    siteName,
    rssId,
    rssName,
    categoryName,
    newsLink,
    newsTitle,
    planetName
  ) {
    return validate.call(this, {
      uuid: videoId,
      pos: videoIndex,
      content_provider_id: siteId,
      content_provider: siteName,
      source_fetch_id: rssId,
      source_fetch: rssName,
      category: categoryName,
      url: newsLink,
      title: newsTitle,
      pg_name: planetName
    });
  },
  category: "planet",
  action: "click_video"
};
/**
 * 點擊播放影音
 */
export const click_video_play = {
  id: 809,
  /**
   *
   * @param {string} videoId 影音 Id
   * @param {number} siteId 站台 Id
   * @param {string} siteName 站台名稱
   * @param {number} rssId RSS Id
   * @param {string} rssName RSS 名稱
   * @param {string} categoryName 分類名稱
   * @param {string} newsLink 內頁網址
   * @param {string} newsTitle 標題
   * @param {string} planetName 星球名稱
   * @param {number} index 影音 Index
   */
  formatPayload(
    videoId,
    siteId,
    siteName,
    rssId,
    rssName,
    categoryName,
    newsLink,
    newsTitle,
    planetName,
    index
  ) {
    return validate.call(this, {
      uuid: videoId,
      content_provider_id: siteId,
      content_provider: siteName,
      source_fetch_id: rssId,
      source_fetch: rssName,
      category: categoryName,
      url: newsLink,
      title: newsTitle,
      pg_name: planetName,
      pos: index
    });
  },
  category: "planet",
  action: "click_video_play"
};
/**
 * 閱讀新聞文章
 */
export const read_news_article = {
  id: 810,
  /**
   *
   * @param {string} newsId 新聞 Id
   * @param {number} siteId 站台 Id
   * @param {string} siteName 站台名稱
   * @param {number} rssId RSS Id
   * @param {string} rssName RSS 名稱
   * @param {number} scrollingPercentage 捲動百分比
   * @param {string} categoryName 分類名稱
   * @param {string} newsLink 內頁網址
   * @param {string} newsTitle 標題
   */
  formatPayload(
    newsId,
    siteId,
    siteName,
    rssId,
    rssName,
    scrollingPercentage,
    categoryName,
    newsLink,
    newsTitle
  ) {
    return validate.call(this, {
      uuid: newsId,
      content_provider_id: siteId,
      content_provider: siteName,
      source_fetch_id: rssId,
      source_fetch: rssName,
      percentage: `${scrollingPercentage}%`,
      category: categoryName,
      url: newsLink,
      title: newsTitle
    });
  },
  category: "planet",
  action: "view_news_page"
};
/**
 * 點擊導引到外部連結
 */
export const click_direct_external_link = {
  id: 811,
  /**
   *
   * @param {string} newsId 新聞 Id
   * @param {number} siteId 站台 Id
   * @param {string} siteName 站台名稱
   * @param {number} rssId RSS Id
   * @param {string} rssName RSS 名稱
   * @param {string} categoryName 分類名稱
   * @param {string} newsLink 內頁網址
   * @param {string} newsTitle 標題
   * @param {string} externalLinkName 外部網址名稱, 如果是檢視原始文章, 改填入 "view_original_article"
   * @param {string} externalLink 外部網址
   */
  formatPayload(
    newsId,
    siteId,
    siteName,
    rssId,
    rssName,
    categoryName,
    newsLink,
    newsTitle,
    externalLinkName,
    externalLink
  ) {
    return validate.call(this, {
      uuid: newsId,
      content_provider_id: siteId,
      content_provider: siteName,
      source_fetch_id: rssId,
      source_fetch: rssName,
      category: categoryName,
      url: newsLink,
      title: newsTitle,
      button_name: externalLinkName,
      external_url: externalLink
    });
  },
  category: "planet",
  action: "view_news_page"
};
/**
 * 點擊頁面底部功能鈕
 */
export const click_buttom_function_line = {
  id: 812,
  /**
   *
   * @param {string} newsId 新聞 Id
   * @param {number} siteId 站台 Id
   * @param {string} siteName 站台名稱
   * @param {number} rssId RSS Id
   * @param {string} rssName RSS 名稱
   * @param {string} categoryName 分類名稱
   * @param {string} newsLink 內頁網址
   * @param {string} newsTitle 標題
   * @param {string} actionName 行為名稱(如果是分享, 填入 "share"; 如果是轉傳, 填入 "forward")
   */
  formatPayload(
    newsId,
    siteId,
    siteName,
    rssId,
    rssName,
    categoryName,
    newsLink,
    newsTitle,
    actionName
  ) {
    return validate.call(this, {
      uuid: newsId,
      content_provider_id: siteId,
      content_provider: siteName,
      source_fetch_id: rssId,
      source_fetch: rssName,
      category: categoryName,
      url: newsLink,
      title: newsTitle,
      button_name: actionName
    });
  },
  category: "planet",
  action: "view_news_page"
};
/**
 * 區塊類型
 */
export const BLOCK_TYPE = {
  VIDEO: "影音",
  NEWS: "情報"
};
/**
 * 特殊外開網址名稱
 */
export const SPECIAL_EXTERNAL_LINK_NAME = {
  view_original_article: "view_original_article"
};
/**
 * 特殊行為名稱
 */
export const SPECIAL_ACTION_NAME = {
  share: "share",
  forward: "forward"
};
/**
 * validate that all the property values of payload are assigned.
 * @param {object|Array<object>} payload
 */
function validate(payload) {
  const failedValues = [null, undefined];
  let success = false;
  if (Array.isArray(payload)) {
    success = payload.every(item =>
      Object.keys(item).every(key => !failedValues.includes(item[key]))
    );
  } else {
    success = Object.keys(payload).every(
      key => !failedValues.includes(payload[key])
    );
  }
  if (success) {
    return payload;
  } else {
    const errorTitle = `events.js:${this.category}/${this.action}`;
    console.error(`[${errorTitle}] ${JSON.stringify(payload, undefined, 2)}`);
  }
}
