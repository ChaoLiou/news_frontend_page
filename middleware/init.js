import { logWatchWrapper } from "@/assets/js/utils";

const fileName = "middleware/init.js";

export default logWatchWrapper(fileName, function({ store, env }) {
  new VConsole();
  console.log({ env });
  store.dispatch("event/fetchEnv", {
    t_ver: env.TRACKING_EVENT.trackingVer
  });
});
