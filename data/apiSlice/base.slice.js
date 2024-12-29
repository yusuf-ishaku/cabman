import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://a5ac-105-116-0-39.ngrok-free.app/api/v1/' });
const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery, 
    endpoints: (builder) => ({}),
});

export default baseApi;