import { hideVConsole } from "@/assets/js/utils";
export default function({ store, env }) {
  new VConsole();
  console.log({ env });
  hideVConsole();
  store.dispatch("event/fetchEnv", {
    t_ver: env.TRACKING_EVENT.trackingVer
  });
}
