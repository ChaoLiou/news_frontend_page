import { get } from "../../assets/js/fetchAPI";
import { getCategoryIdByPlanetId } from "../../assets/js/recommendation/index";

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
    recommendationApiPrefix
  ) {
    let apiRelative = `recommendation/`;
    if (keyword) {
      apiRelative += `stringToProduct?limit=${limit}&string=${keyword}`;
    } else {
      const categoryId = getCategoryIdByPlanetId(planetId);
      if (newsId) {
        apiRelative += `newsToNews?limit=${limit}&categoryId=${categoryId}&newsId=${newsId}`;
      } else if (openId) {
        apiRelative += `userToNews?limit=${limit}&categoryId=${categoryId}&openid=${openId}`;
      }
    }
    return await get(
      apiRelative,
      recommendationApiPrefix
        ? recommendationApiPrefix
        : process.env.BASE_URL.recommendationApi
    );
  }
};
