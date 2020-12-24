/**
 * 星球畫面出現
 */
export const view_ladning_page = {
  id: 800,
  /**
   *
   * @param {string} planetName 星球名稱
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
   * @param {string[]} ids 新聞 Id Array
   * @param {string} blockType 區塊名稱, 使用 BLOCK_TYPE.XX 指定
   * @param {string} categoryName
   * @param {string} planetName
   */
  formatPayload: (ids, blockType, categoryName, planetName) => ({
    uuids: ids,
    section: blockType,
    category: categoryName,
    pg_name: planetName
  }),
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
   * @param {string} categoryName 分類名稱
   * @param {number} categoryIndex 分類 Index
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
   *
   * @param {string} planetName 星球名稱
   * @param {string} categoryName 分類名稱
   * @param {string} detailPageLink 詳細頁網址
   * @param {string} newsTitle 新聞標題
   * @param {string} newsId 新聞 Id
   * @param {number} newsIndex 新聞 Index
   */
  formatPayload: (
    planetName,
    categoryName,
    detailPageLink,
    newsTitle,
    newsId,
    newsIndex
  ) => ({
    pg_name: planetName,
    category: categoryName,
    url: detailPageLink,
    title: newsTitle,
    uuid: newsId,
    pos: newsIndex
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
   * @param {string} planetName 星球名稱
   */
  formatPayload: planetName => ({
    pg_name: planetName
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
   * @param {string} newsId 新聞 Id
   * @param {number} scrollingPercentage 捲動百分比
   */
  formatPayload: (newsId, scrollingPercentage) => ({
    uuid: newsId,
    percentage: `${scrollingPercentage}%`
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
   * @param {string[]} videoIds 影音 Id Array
   */
  formatPayload: videoIds => ({
    uuids: videoIds
  }),
  category: "planet",
  action: "impression_video_page"
};
/**
 * 滑動快充影音banner
 */
export const swipe_banner = {
  id: 807,
  /**
   *
   * @param {string} videoId 影音 Id
   * @param {number} videoIndex 影音 Index
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
   * @param {string} videoId 影音 Id
   * @param {number} videoIndex 影音 Index
   */
  formatPayload: (videoId, videoIndex) => ({
    uuid: videoId,
    pos: videoIndex
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
   * @param {string} videoId 影音 Id
   */
  formatPayload: videoId => ({
    uuid: videoId
  }),
  category: "planet",
  action: "click_video_play"
};
/**
 * 區塊類型
 */
export const BLOCK_TYPE = {
  VIDEO: "影音",
  NEWS: "情報"
};
