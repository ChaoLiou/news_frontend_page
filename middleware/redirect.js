/**
 * noallow contry/area & not at /noallow => redirect /noallow
 * allow contry/area & not at /noallow => nothing
 * noallow contry/area & at /noallow &  => nothing
 * allow contry/area & at /noallow => redirect /index
 */
export default function({ store, redirect, env, route }) {
  const { country } = store.getters["beanfun/profile"];
  const noAllowCountryOrAreaStr = env.NO_ALLOW_COUNTRY_AREA;
  if (noAllowCountryOrAreaStr) {
    const noAllowCountryOrAreas = noAllowCountryOrAreaStr
      .split(",")
      .map(x => x.toUpperCase());
    if (noAllowCountryOrAreas.includes(country.toUpperCase())) {
      if (route.name !== "noallow") {
        return redirect("/noallow");
      }
    } else {
      if (route.name === "noallow") {
        return redirect("/");
      }
    }
  }
}
