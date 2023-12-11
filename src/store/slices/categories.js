import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceCategories from "../../axiosConfig/DubizzleDB";

export const categoriesAction = createAsyncThunk("categoriesGetAll", async () => {
  try {
    const res = await axiosInstanceCategories.get("/categories");
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw error;
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categories: [] },
  extraReducers: (builder) => {
    builder.addCase(categoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
