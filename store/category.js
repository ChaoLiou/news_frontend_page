import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";

const name = "category";

export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].list;
  }
};

export const actions = {
  async fetch({ dispatch, commit, rootGetters }, planetId) {
    try {
      const { language, countrycode } = rootGetters["beanfun/profile"];
      let payload = {
        planetId
      };
      if (language && countrycode) {
        payload = {
          ...payload,
          lang: language.includes("_")
            ? language
            : `${language}_${countrycode}`,
          country: countrycode
        };
      }
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`, payload);
      const list = res.data;
      commitWrapper(commit, `stateRepo/${name}/fetch`, list);
    } catch (error) {
      console.error(error);
    }
  }
};
