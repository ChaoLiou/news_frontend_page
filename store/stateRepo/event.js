export const state = () => ({
  env: {
    app_ver: "",
    app_build: 0,
    t_ver: ""
  },
  info: {
    os_type: "",
    lang: "",
    region: "",
    tz: "",
    latitude: 0,
    longitude: 0
  },
  data: {
    openid: "",
    session_id: "",
    action_index: -1,
    dtm: "",
    event_id: 0,
    payload: undefined
  }
});

export const mutations = {
  fetchEnv(state, env) {
    state.env = { ...state.env, ...env };
  },
  fetchInfo(state, info) {
    state.info = { ...state.info, ...info };
  },
  fetchData(state, data) {
    state.data = { ...state.data, ...data };
  }
};
