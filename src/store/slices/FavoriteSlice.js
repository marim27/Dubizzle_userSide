import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const product = action.payload;
            state.favorites.push(product);
        },
        removeFavorite: (state, action) => {
            const productId = action.payload;
            // state.favorites = state.favorites.filter((product) => product.id !== productId);
            state.favorites = state.favorites.filter((id) => id !== productId);
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
    },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
