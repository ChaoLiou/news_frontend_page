import { forceReloadPage } from "@/assets/js/beanfun";
import expectedVersion from "@/static/version.json";
import { get } from "@/assets/js/fetchAPI";

export default async function() {
  try {
    const actualVersion = await get("/version.json", location.origin);
    if (expectedVersion.ts !== actualVersion.ts) {
      forceReloadPage();
    }
  } catch (error) {
    console.error(error);
  }
}
