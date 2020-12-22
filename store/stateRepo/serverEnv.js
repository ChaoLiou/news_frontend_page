export const state = () => ({
  env: undefined
});

export const mutations = {
  fetch(state, env) {
    state.env = {
      officialAccountId: env.OfficialAccountID,
      token: env.Token,
      secret: env.Secret,
      clientId: env.ClientID,
      widgetId: env.WidgetID,
      newsFrontendPageBuildVersion: env.NewsFrontendPageBuildVersion
    };
  }
};
