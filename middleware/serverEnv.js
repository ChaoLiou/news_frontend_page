import { logWatchWrapper } from "@/assets/js/utils";

const name = "serverEnv";
const fileName = "middleware/serverEnv.js";

export default logWatchWrapper(fileName, async function({ store }) {
  const item = store.getters[`${name}/env`];
  if (!item) {
    return await store.dispatch(`${name}/fetch`);
  }
});
