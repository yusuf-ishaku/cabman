import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://cabman-backend.onrender.com/api/v1/' });
const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery, 
    endpoints: (builder) => ({}),
});

export default baseApi;