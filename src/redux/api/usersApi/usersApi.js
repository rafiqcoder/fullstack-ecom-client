import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (build) => ({
    generateJwt: build.mutation({
      query: (email) => ({
        url: "jwt",
        method: "POST",
        body: email,
      }),
    }),
  }),
});

export const { useGenerateJwtMutation } = usersApi;
