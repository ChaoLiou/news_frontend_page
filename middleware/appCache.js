import { forceReloadPage } from "@/assets/js/beanfun";
export default function({ store, env }) {
  const { newsFrontendPageBuildVersion = "" } = store.getters[`serverEnv/env`];
  if (
    !!newsFrontendPageBuildVersion &&
    newsFrontendPageBuildVersion !== env.BUILD.version
  ) {
    forceReloadPage();
  }
}
