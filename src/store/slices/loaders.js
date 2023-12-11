import { createSlice } from "@reduxjs/toolkit";
const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loader: false,
  },
  reducers: {
    changLoader: function (state, action) {
      state.loader = action.payload;
    },
  },
});

// console.log(loaderSlice.actions);
export const { changLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
