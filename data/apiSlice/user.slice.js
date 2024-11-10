import baseApi from "./base.slice";

export const userApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `user`,
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: 'auth/update-user',
                method: 'PUT',
                body,
            })
        }),
        recieveOtp:  builder.mutation({
            query: (body) => ({
                url: `auth/signup`,
                method: 'POST',
                body,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (body) => ({
                url: `auth/verify-otp`,
                method: 'POST',
                body,
            })
        })
    }),
})

export const {useGetUserQuery, useRecieveOtpMutation, useVerifyOtpMutation, useUpdateUserMutation} = userApiSlice;