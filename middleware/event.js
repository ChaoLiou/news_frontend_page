import { getOSType, getTimeZone } from "@/assets/js/tracking/utils";
import { generateUUID, logWatchWrapper } from "@/assets/js/utils";
import {
  initTracker,
  addBeanfunTracker,
  addGATracker
} from "@/assets/js/tracking";

const name = "event";
const fileName = "middleware/event.js";

export default logWatchWrapper(fileName, async function({ store, env }) {
  const initalized = store.getters[`${name}/initalized`];
  if (!initalized) {
    store.dispatch(`${name}/fetchInfo`, {
      os_type: getOSType(),
      tz: getTimeZone()
    });
    store.dispatch(`${name}/fetchData`, {
      session_id: generateUUID()
    });
    const { language, country } = store.getters["beanfun/profile"];
    store.dispatch(`${name}/fetchInfo`, {
      lang: language,
      region: country
    });
    const { t_ver } = store.getters["event/env"];
    const { open_id } = store.getters["beanfun/verification"];
    await initTracker(
      "null",
      open_id || env.SUPPLIER.openId,
      t_ver,
      process.env.TRACKER_DEBUG_MODE
    );

    const { officialAccountId, token } = await store.getters["serverEnv/env"];
    const trackingGroup = "planet";
    const beanfunTrackerServerUrl = `${env.BASE_URL.trackingApi}/tracking`;
    const oaid = officialAccountId;
    const officialAccountAccessToken = token;
    addBeanfunTracker(
      trackingGroup,
      beanfunTrackerServerUrl,
      oaid,
      officialAccountAccessToken
    );

    addGATracker(trackingGroup, env.TRACKING_EVENT.gaId);

    store.dispatch(`${name}/initalize`);
  }
});
