import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAds = createAsyncThunk("homeAds", async () => {
  const getAdsBySubCategory = await axiosInstanceProducts.get( `/subcategories/getProductArrayBySubCategory`);
  //   console.log(getAdsBySubCategory.data.productList);
  return getAdsBySubCategory.data.productList 
});

export const adsSlice = createSlice({
  name: "ads",
  initialState: { ads: [] },
  extraReducers: (builder) => {
    builder.addCase(getAds.fulfilled, (state, action) => {
      state.ads = action.payload;
    });
  },
});
export default adsSlice.reducer;
