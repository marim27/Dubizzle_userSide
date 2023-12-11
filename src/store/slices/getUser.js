import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getuser = createAsyncThunk("user", async (id) => {
  const getAdsBySubCategory = await axiosInstanceProducts.get( `/subcategories/getProductArrayBySubCategory`);
  //   console.log(getAdsBySubCategory.data.productList);
  return getAdsBySubCategory.data.productList 
});

export const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  extraReducers: (builder) => {
    builder.addCase(getuser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export default userSlice.reducer;
