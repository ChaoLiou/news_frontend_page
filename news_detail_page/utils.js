import { createElement } from "./render";

export const includeScriptSources = scripts => {
  const headDOM = document.head;
  const groups = groupBy(scripts, "name");
  const groupCounters = groupBy(scripts, "name", 0);
  scripts
    .map(x => ({ ...x, onload: window[`${x.name}Onload`] }))
    .forEach(script => {
      const scriptDOM = createElement("script", { src: script.src });
      scriptDOM.onload = function() {
        const counter = ++groupCounters[script.name];
        const max = groups[script.name].length;
        console.log(
          `#${counter} script is load in [${script.name}] group / ${max -
            counter} scripts to go`
        );
        if (counter === max) {
          console.log(`${script.name}Onload`);
          script.onload();
        }
      };
      headDOM.append(scriptDOM);
    });
};

export const groupBy = (list, key, value = undefined) => {
  const result = {};
  const lightweight = value !== undefined;
  list.forEach(x => {
    if (result[x[key]]) {
      if (lightweight) {
      } else {
        result[x[key]].push(x);
      }
    } else {
      if (lightweight) {
        result[x[key]] = value;
      } else {
        result[x[key]] = [x];
      }
    }
  });
  return result;
};

export const parseNewsIdWithinUrl = () => {
  const parts = location.pathname.split("/").filter(v => !!v);
  return parts[parts.length - 2];
};
