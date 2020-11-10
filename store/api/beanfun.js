import { get } from "@/assets/js/fetchAPI";

export const actions = {
  async fetch(_, { access_token }) {
    return await get(`openid/token/verification?token=${access_token}`);
  }
};
