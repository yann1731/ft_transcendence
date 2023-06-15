import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from "./reducers/themeSlice";
import themeSlice from "./reducers/themeSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});

export type RootState = {
    theme: ThemeState;
};

export default store;