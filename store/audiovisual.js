import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";
import { formatNews } from "@/assets/js/formatter";

const name = "audiovisual";

export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].list;
  }
};

export const actions = {
  async fetch({ dispatch, commit }, data) {
    try {
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`, data);
      const list = res;
      commitWrapper(commit, `stateRepo/${name}/fetch`, list);
      return list;
    } catch (error) {
      console.error(error);
    }
  }
};
