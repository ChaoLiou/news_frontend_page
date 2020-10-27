const options = { root: true };
export const dispatchWrapper = async (native, type, payload) => {
  return await native(type, payload, options);
};
export const commitWrapper = async (native, type, payload) => {
  return await native(type, payload, options);
};
