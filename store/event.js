import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";

const name = "event";

export const getters = {
  initalized: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].initalized;
  },
  env: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].env;
  },
  info: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].info;
  },
  data: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].data;
  },
  body: (state, getters, rootState, rootGetters) => {
    return {
      ...getters.env,
      ...getters.info,
      ...getters.data
    };
  }
};

export const actions = {
  async initalize({ commit }) {
    try {
      commitWrapper(commit, `stateRepo/${name}/initalize`);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchEnv({ commit }, data) {
    try {
      commitWrapper(commit, `stateRepo/${name}/fetchEnv`, data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchInfo({ commit }, data) {
    try {
      commitWrapper(commit, `stateRepo/${name}/fetchInfo`, data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchData({ commit }, data) {
    try {
      commitWrapper(commit, `stateRepo/${name}/fetchData`, data);
    } catch (error) {
      console.error(error);
    }
  },
  async emit(
    { dispatch, commit, rootGetters, getters },
    { event_id, payload }
  ) {
    try {
      const { open_id } = await rootGetters["beanfun/verification"];
      const { action_index } = getters.data;
      commitWrapper(commit, `stateRepo/${name}/fetchData`, {
        dtm: Date.now().toString(),
        event_id,
        payload,
        openid: open_id,
        action_index: action_index + 1
      });
      console.log({ env: getters.env });
      console.log({ info: getters.info });
      console.log({ data: getters.data });
      const result = await dispatchWrapper(
        dispatch,
        `api/${name}/emit`,
        getters.body
      );
      console.log({ result });
    } catch (error) {
      console.error(error);
    }
  }
};
