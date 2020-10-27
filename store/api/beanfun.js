import { get } from "@/assets/js/fetchAPI";
const baseUrl = process.env.BASE_URL;

export const actions = {
  async fetch(_, { access_token }) {
    return await get(
      `openid/token/verification?token=${access_token}`,
      baseUrl.beanfunApi
    );
  }
};
