export const localStorageMiddleware = (store) => (next) => (action) => {
  let result = next(action);
  if (action.type === "selectedTheme/toggleTheme") {
    const nextState = store.getState();
    localStorage.setItem(
      "theme",
      nextState.selectedTheme.isDarkMode ? "dark" : "light"
    );
  }
  return result;
};
