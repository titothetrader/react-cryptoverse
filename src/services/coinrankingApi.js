import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const createRequest = (url, headers) => ({url: url, headers: headers})

// Coinranking API

const coinrankingApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}   
const coinrankingBaseUrl = 'https://coinranking1.p.rapidapi.com'

export const coinrankingApi = createApi({
    reducerPath: 'coinrankingApi',
    baseQuery: fetchBaseQuery({ baseUrl: coinrankingBaseUrl }),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: (showCount) => createRequest(`/coins?limit=${showCount}`, coinrankingApiHeaders)
        }),
        getCoinDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`, coinrankingApiHeaders)
        }),
        getCoinHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?${timePeriod}`, coinrankingApiHeaders)
        }),
        // Note: To access this endpoint you need premium plan
        getExchanges: builder.query({
        query: () => createRequest('/exchanges'),
      }),
    })
})

export const { useGetCoinsQuery, useGetCoinDetailsQuery, useGetCoinHistoryQuery, useGetExchangesQuery } = coinrankingApi