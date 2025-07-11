// Need to use the React-specific entry point to allow generating React hooks

import { apiSlice } from "../apiSice";

// Define a service using a base URL and expected endpoints
export const productsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "products",
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery } = productsApi;
