import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";

const name = "serverEnv";

export const getters = {
  env: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].env;
  }
};

export const actions = {
  async fetch({ dispatch, commit }) {
    try {
      const serverEnv = await dispatchWrapper(dispatch, `api/${name}/fetch`);
      commitWrapper(commit, `stateRepo/${name}/fetch`, serverEnv);
    } catch (error) {
      console.error(error);
    }
  }
};
