import {
  getMeProfileAsync,
  checkAppExistAsync,
  initBGO
} from "@/assets/js/beango/index.async";
import { logWatchWrapper } from "@/assets/js/utils";

const fileName = "middleware/redirect.js";

/**
 * noallow contry/area & not at /noallow => redirect /noallow
 * allow contry/area & not at /noallow => nothing
 * noallow contry/area & at /noallow &  => nothing
 * allow contry/area & at /noallow => redirect /index
 */
export default logWatchWrapper(fileName, async function({
  store,
  redirect,
  env,
  route
}) {
  if (await checkAppExistAsync()) {
    const { officialAccountId, token } = store.getters["serverEnv/env"];
    initBGO(officialAccountId, token);
    const profile = await getMeProfileAsync();
    store.dispatch("beanfun/fetchProfile", profile);
    const { country } = store.getters["beanfun/profile"];
    const noAllowCountryOrAreaStr = env.NO_ALLOW_COUNTRY_AREA;
    if (noAllowCountryOrAreaStr) {
      const noAllowCountryOrAreas = noAllowCountryOrAreaStr
        .split(",")
        .map(x => x.toUpperCase());
      if (noAllowCountryOrAreas.includes(country.toUpperCase())) {
        if (route.name !== "noallow") {
          return redirect("/noallow");
        }
      } else {
        if (route.name === "noallow") {
          return redirect("/");
        }
      }
    }
  }
});
