import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // List of favorite recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const existingIndex = state.favoriterecipes.findIndex(
        (recipe) => recipe.idFood === action.payload.idFood
      );

      if (existingIndex >= 0) {
        // Recipe already in favorites, remove it
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Recipe not in favorites, add it
        state.favoriterecipes.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
