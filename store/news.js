import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";
import { formatNews } from "@/assets/js/formatter";
import { formatNews as formatRecommendationNews } from "@/assets/js/recommendation/formatter";

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
          { ...data, openId: open_id }
        );
        list = (res || []).map(formatRecommendationNews);
      }

      if (!rootGetters["token/ts"]) {
        dispatchWrapper(dispatch, "token/update", Date.now());
      }
      const { language, countrycode } = rootGetters["beanfun/profile"];
      const payload = {
        ...data,
        ts: rootGetters["token/ts"],
        lang: language,
        country: countrycode
      };
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`, payload);
      list.push(...res.data.map(formatNews));

      commitWrapper(commit, `stateRepo/${name}/fetch`, list);
      return list;
    } catch (error) {
      console.error(error);
    }
  }
};
