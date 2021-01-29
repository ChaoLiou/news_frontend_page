export const state = () => ({
  env: process.env.BGO
});

export const mutations = {
  fetch(state, env) {
    state.env = {
      officialAccountId: env.OfficialAccountID,
      token: env.Token,
      secret: env.Secret,
      clientId: env.ClientID,
      widgetId: env.WidgetID
    };
  }
};
