import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequestOptions } from "./headers";
import { RootState } from "../../store/store.ts";
const catsSelector = (state: RootState) => {
  return state.allCats;
};
export const getAllCats = createAsyncThunk<Cat[], void, { state: RootState }>(
  "cats/getAllCats",
  async (_, thunkAPI) => {
    const res = await fetch(
      ` https://api.thecatapi.com/v1/images/search?mime_types=jpg,png&limit=20&page=${catsSelector(thunkAPI.getState()).pageNumber}&order=ASC&sub_id=3221rqwe`,
      getRequestOptions,
    );
    thunkAPI.dispatch(catsActions.incrementPage());
    return res.json();
  },
);

export interface Cat {
  favourite: { id: number | undefined };
  id: string;
  url: string;
  like: boolean;
}
interface ICats {
  cats: Cat[];
  loading: boolean;
  initialLoading: boolean;
  pageNumber: number;
}
const initialState: ICats = {
  cats: [],
  loading: true,
  pageNumber: 0,
  initialLoading: true,
};
export const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    changeLike: (state, action) => {
      state.cats = state.cats.map((cat) => {
        if (cat.id === action.payload.id) {
          cat.like = !action.payload.like;
        }
        return cat;
      });
    },
    addFavoriteID: (state, action) => {
      state.cats = state.cats.map((cat) => {
        if (cat.id === action.payload.id) {
          cat.favourite.id = action.payload.favoriteId;
        }
        return cat;
      });
    },
    incrementPage: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCats.fulfilled, (state, action) => {
      state.initialLoading = false;
      const newCats = action.payload.map((cat) => {
        if (cat.favourite) {
          cat.like = true;
        } else {
          cat.favourite = { id: undefined };
          cat.like = false;
        }
        return cat;
      });
      state.cats.push(...newCats);
      state.loading = false;
    });
  },
});
export const { actions: catsActions, reducer: catsReducer } = catsSlice;
