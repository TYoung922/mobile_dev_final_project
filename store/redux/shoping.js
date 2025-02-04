import { createSlice } from "@reduxjs/toolkit";
import { fetchShopping } from "../../util/http";

const shoppingSlice = createSlice({
  name: "shopping",
  initialState: {
    ids: [],
  },
  reducers: {
    setShopping: (state, action) => {
      state.ids = action.payload;
    },
    addShopping: (state, action) => {
      state.ids.push(action.payload);
    },
    removeShopping: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload), 1);
    },
  },
});

export const addShopping = shoppingSlice.actions.addShopping;
export const removeShopping = shoppingSlice.actions.removeShopping;
export const setShopping = shoppingSlice.actions.setShopping;
export default shoppingSlice.reducer;

export function loadShopping(userId) {
  return async (dispatch) => {
    const shoppingList = await fetchShopping(userId);
    dispatch(setShopping(shoppingList));
  };
}
