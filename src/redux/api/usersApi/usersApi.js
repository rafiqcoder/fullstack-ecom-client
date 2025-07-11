import { apiSlice } from "../apiSice";

export const usersApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    generateJwt: build.mutation({
      query: (email) => ({
        url: "jwt",
        method: "POST",
        body: JSON.stringify({ email }), // Ensure the body is a JSON string
        // Include cookies in requests
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useGenerateJwtMutation, useLogoutMutation } = usersApi;
