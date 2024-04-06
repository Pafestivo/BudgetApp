import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme === "dark";
  } else {
    localStorage.setItem("theme", "light");
    return false;
  }
};

const initialState = {
  isDarkMode: getInitialTheme(),
};

const selectedThemeSlice = createSlice({
  name: "selectedTheme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
    },
  },
});

export const { toggleTheme } = selectedThemeSlice.actions;
export default selectedThemeSlice.reducer;
