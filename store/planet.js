import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";

const name = "planet";

export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].list;
  },
  find: (state, getters, rootState, rootGetters) => id => {
    return getters.list.find(x => x.id === id);
  }
};

export const actions = {
  async fetch({ dispatch, commit, rootGetters }) {
    try {
      const { language, countrycode } = rootGetters["beanfun/profile"];
      let payload = undefined;
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
