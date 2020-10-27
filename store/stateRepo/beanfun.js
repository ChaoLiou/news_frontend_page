export const state = () => ({
  accessToken: {
    me_profile: {
      chat_id: "",
      nickname: "",
      photo: ""
    },
    access_token: "",
    access_token_expired_at: 0
  },
  verification: {
    client_id: "",
    client_name: "",
    expires_at: "",
    is_valid: false,
    user_id: 0,
    open_id: "",
    username: ""
  },
  profile: {
    chat_id: "",
    nickname: "",
    photo: "",
    photo_encode: "",
    countrycode: "",
    language: "",
    phoneVerified: false,
    emailVerified: false,
    level: 0,
    lang: "",
    country: "",
    platform: "",
    phone_model: "",
    os_version: "",
    app_version: ""
  },
  location: {
    longitude: null,
    latitude: null
  }
});

export const mutations = {
  fetchAccessToken(state, accessToken) {
    state.accessToken = accessToken || state.accessToken;
  },
  verify(state, verification) {
    state.verification = verification || state.verification;
  },
  fetchProfile(state, profile) {
    state.profile = profile || state.profile;
  },
  fetchLocation(state, location) {
    state.location = location || state.location;
  }
};
