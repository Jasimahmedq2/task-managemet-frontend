import { Api } from "../api";

const authApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query(token) {
        return {
          url: `/auth/verify/${token}`,
          method: "POST",
          body: token,
        };
      },
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: `/auth/login`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useLoginUserMutation,
} = authApi;
