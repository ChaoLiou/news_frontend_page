import { forceReloadPage } from "@/assets/js/beango/index";
export default function({ store, env }) {
  const { newsFrontendPageBuildVersion = "" } = store.getters[`serverEnv/env`];
  if (
    !!newsFrontendPageBuildVersion &&
    newsFrontendPageBuildVersion !== env.BUILD.version
  ) {
    forceReloadPage();
  }
}
