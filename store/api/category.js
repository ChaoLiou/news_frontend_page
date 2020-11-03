import { get } from "@/assets/js/fetchAPI";

export const actions = {
  async fetch(_, { planetId, lang, country }) {
    const apiRelative = `category?bannerID=${planetId}&lang=${lang}&country=${country}`;
    return await get(apiRelative);
  }
};
