const name = "serverEnv";

export default function({ store }) {
  const item = store.getters[`${name}/env`];
  if (!item) {
    return store.dispatch(`${name}/fetch`);
  }
}
