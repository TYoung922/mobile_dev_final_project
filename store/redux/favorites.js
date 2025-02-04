import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites } from "../../util/http";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.ids = action.payload;
    },
    addFavorite: (state, action) => {
      state.ids.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload), 1);
    },
  },
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export const setFavorites = favoritesSlice.actions.setFavorites;
export default favoritesSlice.reducer;

export function loadFavorites(userId) {
  return async (dispatch) => {
    const favorites = await fetchFavorites(userId);
    dispatch(setFavorites(favorites));
  };
}
