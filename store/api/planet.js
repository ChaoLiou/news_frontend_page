import { get } from "@/assets/js/fetchAPI";

export const actions = {
  async fetch(_, { lang, country }) {
    return await get(`main?lang=${lang}&country=${country}`);
  }
};
