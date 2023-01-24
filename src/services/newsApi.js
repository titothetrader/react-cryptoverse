import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const createRequest = (url, headers) => ({url: url, headers: headers})

const newsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '03e01011d4msh51e9759e7d6003fp1fe863jsnd8aa8032176e',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

const newsApiBaseUrl = 'https://bing-news-search1.p.rapidapi.com'

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl: newsApiBaseUrl }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ newsCategory, showCount }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${showCount}`, newsApiHeaders)
        })
    })
})

export const {useGetNewsQuery } = newsApi