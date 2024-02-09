import { configureStore } from "@reduxjs/toolkit";
import { catsSlice } from "../features/catsSlice/catsSlice.ts";
import {
  favoriteReducer,
  favoriteSlice,
} from "../features/catsSlice/favoriteSlice.ts";

export const store = configureStore({
  reducer: {
    allCats: catsSlice.reducer,
    favorite: favoriteReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
