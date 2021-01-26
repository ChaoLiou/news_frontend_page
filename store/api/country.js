import { get } from "@/assets/js/fetchAPI";

export const actions = {
  async fetch() {
    return await get("IPv4ToCountry");
  }
};
