const options = { root: true };
export const dispatchWrapper = async (native, type, payload) => {
  return await native(type, payload, options);
};
export const commithWrapper = async (native, type, payload) => {
  return await native(type, payload, options);
};
