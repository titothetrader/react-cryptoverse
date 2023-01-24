import { configureStore } from "@reduxjs/toolkit"

import { cryptoExchangesApi } from '../services/cryptoExchangesApi'
import { coinrankingApi } from "../services/coinrankingApi"
import { newsApi } from "../services/newsApi"
import { coinGeckoApi } from "../services/coinGeckoApi"

export default configureStore({
    reducer: {
        [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
        [coinrankingApi.reducerPath]: coinrankingApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
        [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([cryptoExchangesApi.middleware, coinrankingApi.middleware, newsApi.middleware, coinGeckoApi.middleware]),
})