import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites";
import shoppingReducer from "./shoping";

export const store = configureStore({
  reducer: {
    favoriteMeals: favoritesReducer,
    shoppingList: shoppingReducer,
  },
});
