import { getOSType, getTimeZone } from "@/assets/js/tracking/utils";
import {
  getMeProfile,
  getMeLocation,
  checkAppExist
} from "@/assets/js/beanfun";
import { generateUUID } from "@/assets/js/utils";

const name = "event";

export default function({ store }) {
  store.dispatch(`${name}/fetchInfo`, {
    os_type: getOSType(),
    tz: getTimeZone()
  });
  store.dispatch(`${name}/fetchData`, {
    session_id: generateUUID()
  });
  checkAppExist(() => {
    getMeProfile(profile => {
      store.dispatch("beanfun/fetchProfile", profile);
      const { language, country } = store.getters["beanfun/profile"];
      store.dispatch(`${name}/fetchInfo`, {
        lang: language,
        region: country
      });
    });
  });
}
