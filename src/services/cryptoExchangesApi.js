import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const createRequest = (url, headers) => ({url: url, headers: headers})

// Crypto Exchanges API

const cryptoExchangesApiHeaders = {
    'X-RapidAPI-Key': '03e01011d4msh51e9759e7d6003fp1fe863jsnd8aa8032176e',
    'X-RapidAPI-Host': 'crypto-exchanges1.p.rapidapi.com'
}

const cryptoExchangesBaseUrl = 'https://crypto-exchanges1.p.rapidapi.com'

export const cryptoExchangesApi = createApi({
    reducerPath: 'cryptoExchangesApi',
    baseQuery: fetchBaseQuery({ baseUrl: cryptoExchangesBaseUrl }),
    endpoints: (builder) => ({
        getCryptoExchanges: builder.query({
            query: () => createRequest('/exchanges', cryptoExchangesApiHeaders)
        })
    })
})


export const { useGetCryptoExchangesQuery } = cryptoExchangesApi