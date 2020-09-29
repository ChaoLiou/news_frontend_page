const name = "planets";

export default function({ store }) {
  const list = store.getters[`${name}/list`];
  if (!list || list.length === 0) {
    return store.dispatch(`${name}/fetch`);
  }
}
