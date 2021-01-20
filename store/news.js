import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";
import { formatNews } from "@/assets/js/formatter";
import { formatNews as formatRecommendationNews } from "@/assets/js/recommendation/formatter";
const { openId: testingOpenId } = process.env.SUPPLIER;
const name = "news";

export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].list;
  }
};

export const actions = {
  async fetch({ rootState, rootGetters, dispatch, commit }, data) {
    try {
      let list = [];
      if (data.recommendation) {
        const { open_id } = await rootGetters["beanfun/verification"];
        const res = await dispatchWrapper(
          dispatch,
          `api/${name}/fetchRecommendation`,
          { ...data, openId: testingOpenId ? testingOpenId : open_id }
        );
        if (Array.isArray(res)) {
          list = res.map(formatRecommendationNews);
        } else {
          console.error(
            `[store/news/fetch] an error has occured: ${res ? res.message : ""}`
          );
        }
      }

      if (!rootGetters["token/ts"]) {
        dispatchWrapper(dispatch, "token/update", Date.now());
      }
      const { lang, country } = rootGetters["beanfun/profile"];
      const payload = {
        ...data,
        ts: rootGetters["token/ts"],
        lang,
        country
      };
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`, payload);
      if (res && Array.isArray(res.data)) {
        list.push(...res.data.map(formatNews));
      }

      commitWrapper(commit, `stateRepo/${name}/fetch`, list);
      return list;
    } catch (error) {
      console.error(error);
    }
  }
};
