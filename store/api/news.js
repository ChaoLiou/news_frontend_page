import { get } from "@/assets/js/fetchAPI";

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
  }
};
