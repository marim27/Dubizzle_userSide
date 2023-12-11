import { createSlice } from "@reduxjs/toolkit";
const bayPackagesSlice = createSlice({
    name: "bayPackages",
    initialState: {
        Packages: JSON.parse(localStorage.getItem("bayPackages")) || [],
    },
    reducers: {
        setPackages: (state, action) => {
            const savebayPackages = [...state.Packages, action.payload];
            localStorage.setItem("bayPackages", JSON.stringify(savebayPackages));
            return { ...state, Packages: savebayPackages };
        },
        deletePackages: (state, action) => {
            const deletebayPackages = state.Packages.filter((Package) => Package._id !== action.payload);
            localStorage.setItem("bayPackages", JSON.stringify(deletebayPackages));
            return { ...state, Packages: deletebayPackages };
        },
        deleteAllPackages: (state, action) => {
            localStorage.removeItem("bayPackages");
            return { ...state, Packages: []};
        },
    },
});
export const { setPackages, deletePackages ,deleteAllPackages} = bayPackagesSlice.actions;

export default bayPackagesSlice.reducer;
