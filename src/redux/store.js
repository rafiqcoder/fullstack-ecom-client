import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice/cartSlice.js";
import { apiSlice } from "./api/apiSice.js";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
