import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceCategories from "../../axiosConfig/DubizzleDB";

export const popularsubcategoriesAction = createAsyncThunk(
  "popularSubCategories",
  async () => {
      try {
        // to get parent category list to loop through and get firist 2 sub categories of each category
          const paternt = await axiosInstanceCategories.get(`/categories`);
          
          let subarr = [];
          let res

          for (const category of paternt.data){
              res = await axiosInstanceCategories.get(`/subcategories/CategoryID?CategoryID=${category._id}&limit=1`);
              subarr.push(...res.data);
          }

      // console.log(paternt.data);
      // console.log(res.data);
      // console.log(subarr);
      return subarr;
    } catch (error) {
      console.error("Error fetching :", error);
      throw error;
    }
  }
);

const popularSubCategoriesSlice = createSlice({
  name: "popularsubcategories",
  initialState: { popularsubcategories: [] },
  extraReducers: (builder) => {
    builder.addCase(popularsubcategoriesAction.fulfilled, (state, action) => {
      state.popularsubcategories = action.payload;
    });
  },
});

export default popularSubCategoriesSlice.reducer;
