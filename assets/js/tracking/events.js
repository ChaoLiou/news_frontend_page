/**
 * 星球畫面出現
 */
export const view_ladning_page = {
  id: 800,
  /**
   *
   * @param {String} planetName 星球名稱
   */
  formatPayload: planetName => ({
    pg_name: planetName
  }),
  category: "planet",
  action: "view_ladning_page"
};
/**
 * 星球首頁內容曝光
 */
export const impression_landing_page = {
  id: 801,
  /**
   *
   * @param {Object[]} list 新聞/影音 Array, 物件包含以下 fields:
   * @param {String} ids 新聞/影音 field - Id
   * @param {String} blockType 新聞/影音 field - 區塊名稱, 使用 BLOCK_TYPE.XX 指定
   * @param {String} categoryName 新聞/影音 field - 分類名稱
   * @param {String} planetName 新聞/影音 field - 星球名稱
   * @param {String} siteName 新聞/影音 field - 站台名稱
   * @param {String} rsstName 新聞/影音 field - RSS 名稱
   */
  formatPayload: list =>
    list.map(item => ({
      uuid: item.id,
      section: item.blockType,
      category: item.categoryName,
      pg_name: item.planetName,
      content_provider: item.siteName,
      source_fetch: item.rssName
    })),
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
   * @param {String} categoryName 分類名稱
   * @param {Number} categoryIndex 分類 Index
   */
  formatPayload: (categoryName, categoryIndex) => ({
    category: categoryName,
    pos: categoryIndex
  }),
  category: "planet",
  action: "click_news_category"
};
/**
 * 點擊星球情報內新聞
 */
export const click_news = {
  id: 803,
  /**
   * @param {String} newsId 新聞 Id
   * @param {Number} newsIndex 新聞 Index
   * @param {Number} siteId 站台 Id
   * @param {String} siteName 站台名稱
   * @param {Number} rssId RSS Id
   * @param {String} rssName RSS 名稱
   */
  formatPayload: (newsId, newsIndex, siteId, siteName, rssId, rssName) => ({
    uuid: newsId,
    pos: newsIndex,
    content_provider_id: siteId,
    content_provider: siteName,
    source_fetch_id: rssId,
    source_fetch: rssName
  }),
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
   * @param {String} planetName 星球名稱
   */
  formatPayload: planetName => ({
    pg_tab: planetName
  }),
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
   * @param {String} newsId 新聞 Id
   * @param {Number} siteId 站台 Id
   * @param {String} siteName 站台名稱
   * @param {Number} rssId RSS Id
   * @param {String} rssName RSS 名稱
   */
  formatPayload: (newsId, siteId, siteName, rssId, rssName) => ({
    uuid: newsId,
    content_provider_id: siteId,
    content_provider: siteName,
    source_fetch_id: rssId,
    source_fetch: rssName
  }),
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
   * @param {Object[]} videos 影音 Array, 物件包含以下 fields:
   * @param {String} id 影音 field - Id
   * @param {Number} siteId 影音 field - 站台 Id
   * @param {String} siteName 影音 field - 站台名稱
   * @param {Number} rssId 影音 field - RSS Id
   * @param {String} rssName 影音 field - RSS 名稱
   */
  formatPayload: videos =>
    videos.map(video => ({
      uuid: video.id,
      content_provider_id: video.siteId,
      content_provider: video.siteName,
      source_fetch_id: video.rssId,
      source_fetch: video.rssName
    })),
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
   * @param {String} videoId 影音 Id
   * @param {Number} videoIndex 影音 Index
   */
  formatPayload: (videoId, videoIndex) => ({
    uuid: videoId,
    pos: videoIndex
  }),
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
   * @param {String} videoId 影音 Id
   * @param {Number} videoIndex 影音 Index
   * @param {Number} siteId 站台 Id
   * @param {String} siteName 站台名稱
   * @param {Number} rssId RSS Id
   * @param {String} rssName RSS 名稱
   */
  formatPayload: (videoId, videoIndex, siteId, siteName, rssId, rssName) => ({
    uuid: videoId,
    pos: videoIndex,
    content_provider_id: siteId,
    content_provider: siteName,
    source_fetch_id: rssId,
    source_fetch: rssName
  }),
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
   * @param {String} videoId 影音 Id
   * @param {Number} siteId 站台 Id
   * @param {String} siteName 站台名稱
   * @param {Number} rssId RSS Id
   * @param {String} rssName RSS 名稱
   */
  formatPayload: (videoId, siteId, siteName, rssId, rssName) => ({
    uuid: videoId,
    content_provider_id: siteId,
    content_provider: siteName,
    source_fetch_id: rssId,
    source_fetch: rssName
  }),
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
   * @param {String} newsId 新聞 Id
   * @param {Number} siteId 站台 Id
   * @param {String} siteName 站台名稱
   * @param {Number} rssId RSS Id
   * @param {String} rssName RSS 名稱
   * @param {Number} scrollingPercentage 捲動百分比
   */
  formatPayload: (
    newsId,
    siteId,
    siteName,
    rssId,
    rssName,
    scrollingPercentage
  ) => ({
    uuid: newsId,
    content_provider_id: siteId,
    content_provider: siteName,
    source_fetch_id: rssId,
    source_fetch: rssName,
    percentage: `${scrollingPercentage}%`
  }),
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
