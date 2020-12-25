const path = require("path");

module.exports = {
  title: "Beanfun! 星球主頁 Style Guide",
  components: "components/**/*.vue",
  getComponentPathLine(componentPath) {
    const componentFileName = path.basename(componentPath, ".vue");
    const name =
      componentFileName.toLowerCase() === "index"
        ? path.basename(path.dirname(componentPath))
        : componentFileName;
    return `import ${name} from '~/${componentPath.replace(/\\/g, "/")}'`;
  },
  usageMode: "expand",
  exampleMode: "expand",
  displayOrigins: true,
  styleguideDir: "./static/styleguide"
};
