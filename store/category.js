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
      const { lang, country } = rootGetters["beanfun/profile"];
      const payload = {
        planetId,
        lang,
        country
      };
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`, payload);
      const list = res.data;
      commitWrapper(commit, `stateRepo/${name}/fetch`, list);
    } catch (error) {
      console.error(error);
    }
  }
};
