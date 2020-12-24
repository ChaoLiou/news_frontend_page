import { get } from "../../assets/js/fetchAPI";

export const actions = {
  async fetch(
    _,
    { pageIndex, pageSize, categoryId, planetId, ts, lang, country }
  ) {
    let apiRelative = `news?page=${pageIndex}&pageSize=${pageSize}&timestamp=${ts}&lang=${lang}&country=${country}`;
    if (planetId) {
      apiRelative += `&bannerID=${planetId}`;
    } else if (categoryId) {
      apiRelative += `&categoryID=${categoryId}`;
    }
    return await get(apiRelative);
  },
  async fetchRecommendation(
    _,
    { limit = 20, planetId, newsId, openId, keyword },
    apiPrefix
  ) {
    let apiRelative = `recommendation/`;
    if (keyword) {
      apiRelative += `stringToProduct?limit=${limit}&string=${keyword}`;
    } else {
      if (newsId) {
        apiRelative += `newsToNews?limit=${limit}&categoryId=${planetId}&newsId=${newsId}`;
      } else if (openId) {
        apiRelative += `userToNews?limit=${limit}&categoryId=${planetId}&openid=${openId}`;
      } else {
        console.error(
          `[store/api/news:fetchRecommendation] keyword, newsId or openId required`
        );
        return;
      }
    }
    return await get(
      apiRelative,
      apiPrefix ? apiPrefix : process.env.BASE_URL.recommendationApi
    );
  }
};
