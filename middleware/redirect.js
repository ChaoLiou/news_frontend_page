import {
  getMeProfileAsync,
  checkAppExistAsync,
  initBGO
} from "@/assets/js/beango/index.async";
import { logWatchWrapper } from "@/assets/js/utils";

const fileName = "middleware/redirect.js";

/**
 * if contry is not allowed and not at `/noallow` page, then redirect to `/noallow` page
 * if contry is allowed and not at `/noallow` page, then skip
 * if country is not allowed and at `/noallow` page, then skip
 * if country is allowed and at `/noallow` page, then redirect to `/index` page
 */
export default logWatchWrapper(fileName, async function({
  store,
  redirect,
  env,
  route
}) {
  const getCountryFromAppFn = logWatchWrapper(
    "middleware/redirect.js:getCountryFromApp",
    getCountryFromApp
  );
  const getCountryFromIpServiceFn = logWatchWrapper(
    "middleware/redirect.js:getCountryFromIpService",
    getCountryFromIpService
  );
  const countryFromApp = await getCountryFromAppFn(store);
  const countryFromIpService = await getCountryFromIpServiceFn(store);

  const countriesNotAllowed = getCountriesNotAllowed(env);
  console.log({ countryFromApp, countryFromIpService, countriesNotAllowed });

  const isNotAllowed = countriesNotAllowed.some(cna =>
    [countryFromApp, countryFromIpService].includes(cna)
  );

  const atNoAllowPage = route.name === "noallow";
  if (isNotAllowed && atNoAllowPage) {
    return redirect("/");
  } else if (isNotAllowed && !atNoAllowPage) {
    return redirect("/noallow");
  }
});

async function getCountryFromApp(store) {
  if (await checkAppExistAsync()) {
    const { officialAccountId, token } = store.getters["serverEnv/env"];
    initBGO(officialAccountId, token);
    const profile = await getMeProfileAsync();
    store.dispatch("beanfun/fetchProfile", profile);
    return store.getters["beanfun/profile"];
  }
}

async function getCountryFromIpService(store) {
  await store.dispatch("country/fetch");
  const info = store.getters["country/info"];
  return info.CountryCode;
}

function getCountriesNotAllowed(env) {
  const countriesNotAllowedEnv = env.NO_ALLOW_COUNTRY_AREA;
  return countriesNotAllowedEnv
    ? countriesNotAllowedEnv.split(",").map(x => x.toUpperCase())
    : [];
}
