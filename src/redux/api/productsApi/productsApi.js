// Need to use the React-specific entry point to allow generating React hooks

import { apiSlice } from "../apiSice";

// Define a service using a base URL and expected endpoints
export const productsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "products",
      providesTags: ["Product"], // Tags for cache invalidation
    }),
    addProduct: build.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: JSON.stringify(product), // Ensure the body is a JSON string
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProducts: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductsMutation,
} = productsApi;
