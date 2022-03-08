export const state = (_) => ({
  isDarkmode: false,
});
export const mutations = {
  setIsDarkmode: (state, data) => (state.isDarkmode = data),
};
