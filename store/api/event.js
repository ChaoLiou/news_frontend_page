import { post } from "@/assets/js/fetchAPI";
const baseUrl = process.env.BASE_URL;

export const actions = {
  async emit(_, body) {
    return await post("tracking", body, baseUrl.trackingApi);
  }
};
