import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceCategories from "../../axiosConfig/DubizzleDB";

export const subcategoriesAction = createAsyncThunk("subCategoriesGetAll", async () => {
    try {
        // const res = await axiosInstanceCategories.get(`/subcategories/CategoryID?CategoryID=64d3d823e324108e7f9be88d&limit=2`);
        const res = await axiosInstanceCategories.get(`/subcategories`);
        // console.log(res);
      return res.data.data.data;
    } catch (error) {
      console.error("Error fetching :", error);
      throw error;
    }
  }
);

const subCategoriesSlice = createSlice({
  name: "subcategories",
  initialState: { subcategories: [] },
  extraReducers: (builder) => {
    builder.addCase(subcategoriesAction.fulfilled, (state, action) => {
      state.subcategories = action.payload;
    });
  },
});

export default subCategoriesSlice.reducer;
