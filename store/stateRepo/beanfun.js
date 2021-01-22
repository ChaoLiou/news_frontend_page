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
    country: "TW",
    language: "",
    phoneVerified: false,
    emailVerified: false,
    level: 0,
    lang: "zh_TW",
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
    const lang = correctProfileLang(profile.lang);
    state.profile = { ...profile, lang } || state.profile;
  },
  fetchLocation(state, location) {
    state.location = location || state.location;
  }
};

function correctProfileLang(lang) {
  const expectedLangs = ["zh_TW", "zh_HK", "en_US"];
  const isExpected = expectedLangs.includes(lang);
  const defaultLang = "zh_TW";
  return isExpected ? lang : defaultLang;
}
