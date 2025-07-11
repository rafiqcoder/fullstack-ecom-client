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
    addUser: build.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: JSON.stringify(user), // Ensure the body is a JSON string
      }),
      invalidatesTags: ["User"],
    }),
    getAdmin: build.mutation({
      query: (email) => ({
        url: `users/admin/${email}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGenerateJwtMutation,
  useLogoutMutation,
  useAddUserMutation,
  useGetAdminMutation,
} = usersApi;
