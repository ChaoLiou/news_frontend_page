import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";

const name = "country";

export const getters = {
  info: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].info;
  }
};

export const actions = {
  async fetch({ dispatch, commit }) {
    try {
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`);
      if (!res.code || !res.message) {
        commitWrapper(commit, `stateRepo/${name}/fetch`, res);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
