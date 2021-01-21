import { logWatchWrapper } from "@/assets/js/utils";

const name = "planet";
const fileName = "middleware/planet.js";

export default logWatchWrapper(fileName, async function({ store }) {
  const list = store.getters[`${name}/list`];
  if (!list || list.length === 0) {
    return await store.dispatch(`${name}/fetch`);
  }
});
