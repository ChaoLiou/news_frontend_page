import { hideVConsole } from "@/assets/js/utils";
export default function({ store, env }) {
  new VConsole();
  console.log({ env });
  hideVConsole();
  store.dispatch("event/fetchEnv", {
    app_ver: env.TRACKING_EVENT.appVer,
    app_build: env.TRACKING_EVENT.appBuild,
    t_ver: env.TRACKING_EVENT.trackingVer
  });
}
