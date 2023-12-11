import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categories";
import subcategories from "./slices/subCategories";
import  ads from "./slices/subads";
import loader from "./slices/loaders";
import Packages from "./slices/cartPackage";
import favoritesReducer from './slices/FavoriteSlice';
import favoritesSearchReducer from './slices/FavoriteSearchSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    favorites: favoritesReducer,
    favoriteSearch: favoritesSearchReducer,
    subcategories: subcategories,
    ads:ads,
    loader: loader,
    Packages:Packages,
  },
});
export default store;