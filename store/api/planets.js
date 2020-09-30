import { get } from "@/assets/js/fetchAPI";

export const actions = {
  async fetch(_, { lang, country } = { lang: "zh_TW", country: "TW" }) {
    return await get(`main?lang=${lang}&country=${country}`);
  }
};
