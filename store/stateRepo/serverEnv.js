export const state = () => ({
  env: {
    ...process.env.BGO,
    officialAccountId: process.env.BGO.BgoOfficialAccountId
  }
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
