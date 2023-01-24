import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const coinGeckoBaseURL = 'https://api.coingecko.com/api/v3'

export const coinGeckoApi = createApi({
    reducerPath: 'coinGeckoApi',
    baseQuery: fetchBaseQuery({ baseUrl: coinGeckoBaseURL }),
    endpoints: (builder) => ({
        getExchanges: builder.query({
            query: () => '/exchanges'
        }),
    })
})

export const { useGetExchangesQuery } = coinGeckoApi