import { logWatchWrapper } from "@/assets/js/utils";

const fileName = "middleware/init.js";

export default logWatchWrapper(fileName, function({ env }) {
  new VConsole();
  console.log({ env });
});
