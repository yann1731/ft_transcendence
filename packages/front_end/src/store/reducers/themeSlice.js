import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lightMode: !!JSON.parse(localStorage.getItem("lightMode")),
};

export const syncToggleTheme = () => (dispatch) => {
    const isLightMode = !!JSON.parse(localStorage.getItem("lightMode"));
    localStorage.setItem("lightMode", !isLightMode);
    dispatch(toggleTheme());
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.lightMode = !state.lightMode;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;