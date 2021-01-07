export default function({ store, env }) {
  new VConsole();
  console.log({ env });
  store.dispatch("event/fetchEnv", {
    t_ver: env.TRACKING_EVENT.trackingVer
  });
}
