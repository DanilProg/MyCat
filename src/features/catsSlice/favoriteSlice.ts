import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequestOptions, headers } from "./headers";
export const getFavoriteCats = createAsyncThunk(
  "cats/getFavoriteCats",
  async () => {
    const res = await fetch(
      "https://api.thecatapi.com/v1/favourites",
      getRequestOptions,
    );
    return res.json();
  },
);
export const deleteFavoriteCats = createAsyncThunk(
  "cats/deleteCatsFavorite",
  async (id: number | undefined) => {
    if (id) {
      const res = await fetch(`https://api.thecatapi.com/v1/favourites/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      return res.json();
    } else {
      return console.log("Невозможно удалить");
    }
  },
);
export const addCatsFavorite = createAsyncThunk(
  "cats/addCatsFavorite",
  async (id: string) => {
    const userDanil = {
      name: "damn",
      id: "3221rqwe",
    };
    const data = await fetch("https://api.thecatapi.com/v1/favourites", {
      method: "post",
      body: JSON.stringify({ image_id: id, sub_id: userDanil.id }),
      headers: headers,
    });
    return data.json();
  },
);
export interface FavoriteCat {
  id: number;
  image: { id: string; url: string };
}
interface Favorite {
  favoriteCats: FavoriteCat[] | null;
  loading: boolean;
}
const initialState: Favorite = {
  favoriteCats: null,
  loading: true,
};
export const favoriteSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    addCat: (state, action: PayloadAction<FavoriteCat>) => {
      if (state.favoriteCats !== null) {
        state.favoriteCats.push(action.payload);
      }
    },
    deleteCat: (state, action: PayloadAction<string>) => {
      state.favoriteCats = state.favoriteCats!.filter(
        (cat) => cat.image.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteCats.pending, (state) => {
      state.favoriteCats = [];
      state.loading = true;
    });
    builder.addCase(getFavoriteCats.fulfilled, (state, action) => {
      state.favoriteCats = action.payload;
      state.loading = false;
    });
    builder.addCase(addCatsFavorite.fulfilled, (state, action) => {});
    builder.addCase(deleteFavoriteCats.pending, (state) => {});
    builder.addCase(deleteFavoriteCats.fulfilled, (state, action) => {});
  },
});

export const { actions: favoriteActions, reducer: favoriteReducer } =
  favoriteSlice;
