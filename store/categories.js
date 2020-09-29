import { dispatchWrapper, commithWrapper } from "@/assets/js/vuex-utils";

const name = "categories";

export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].list;
  }
};

export const actions = {
  async fetch({ dispatch, commit }, planetId) {
    try {
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`, {
        planetId
      });
      const list = res.data;
      commithWrapper(commit, `stateRepo/${name}/fetch`, list);
    } catch (error) {
      console.error(error);
    }
  }
};
