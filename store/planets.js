import { dispatchWrapper, commithWrapper } from "@/assets/js/vuex-utils";

const name = "planets";

export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].list;
  },
  find: (state, getters, rootState, rootGetters) => id => {
    return getters.list.find(x => x.id === id);
  }
};

export const actions = {
  async fetch({ dispatch, commit }) {
    try {
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`);
      const list = res.data;
      commithWrapper(commit, `stateRepo/${name}/fetch`, list);
    } catch (error) {
      console.error(error);
    }
  }
};
