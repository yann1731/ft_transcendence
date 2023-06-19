import { createSlice } from "@reduxjs/toolkit";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const initialState = {
    lightMode: !!JSON.parse(localStorage.getItem("lightMode")),
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

export const asyncToggleTheme = (): Promise<any> => async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    const isLightMode = !!JSON.parse(localStorage.getItem("lightMode"));
    localStorage.setItem("lightMode", !isLightMode);
    dispatch(toggleTheme());
};

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;