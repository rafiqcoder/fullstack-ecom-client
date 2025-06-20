import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice/cartSlice.js";
import { productsApi } from "./api/productsApi/productsApi.js";

const store = configureStore({
  reducer: {
        cart: cartSlice,
        [productsApi.reducerPath]: productsApi.reducer,
      
      
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
