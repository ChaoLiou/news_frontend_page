import { get } from "@/assets/js/fetchAPI";

const name = "serverEnv";

export const actions = {
  async fetch() {
    return await get("variable");
  }
};
