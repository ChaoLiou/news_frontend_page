import {
  initTracker as _initTracker,
  addBeanfunTracker
} from "../assets/js/tracking";

export const initTracker = async ({
  openId,
  tVer,
  beanfunTrackerServerUrl,
  oaid,
  officialAccountAccessToken
}) => {
  await _initTracker("null", openId, tVer, true);
  addBeanfunTracker(
    "planet",
    beanfunTrackerServerUrl,
    oaid,
    officialAccountAccessToken
  );
};
