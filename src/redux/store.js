import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice/cartSlice.js";
import { productsApi } from "./api/productsApi/productsApi.js";
import { usersApi } from "./api/usersApi/usersApi.js";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, usersApi.middleware),
});

export default store;
