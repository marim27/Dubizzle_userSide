import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteSearch: [],
};

const favoriteSearchSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavoriteSearch: (state, action) => {
            const product = action.payload;
            state.favoriteSearch.push(product);
        },
        removeFavoriteSearch: (state, action) => {
            const productId = action.payload;
            state.favoriteSearch = state.favorites.filter((product) => product.URL !== productId);
        },
        setFavoritesSearch: (state, action) => {
            state.favoriteSearch = action.payload;
        },
    },
});

export const { addFavoriteSearch, removeFavoriteSearch, setFavoritesSearch } = favoriteSearchSlice.actions;

export default favoriteSearchSlice.reducer;
