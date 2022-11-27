/* eslint-disable dot-notation */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Watchlist'],
  endpoints: (builder) => ({
    getUserWatchlists: builder.query({
      query: (userID) => `/users/lists/${userID}`,
      providesTags: ['Watchlist'],
    }),
    addWatchlist: builder.mutation({
      query: ({ userID, listname, position }) => ({
        url: `/users/lists/${userID}/watchlist/${listname}/position/${position}`,
        method: 'POST',
      }),
      invalidatesTags: ['Watchlist'],
    }),
    deleteWatchlist: builder.mutation({
      query: ({ userID, listname, position }) => ({
        url: `/users/lists/${userID}/watchlist/${listname}/position/${position}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Watchlist'],
    }),
    updateWatchlistName: builder.mutation({
      query: ({
        userID, currentListName, position, newListName,
      }) => ({
        url: `/users/lists/${userID}/watchlist/${currentListName}/position/${position}/list/${newListName}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Watchlist'],
    }),
    addStockToWatchlist: builder.mutation({
      query: ({
        userID, listname, position, stock,
      }) => ({
        url: `/users/lists/${userID}/watchlist/${listname}/position/${position}/stock/${stock}`,
        method: 'POST',
      }),
      invalidatesTags: ['Watchlist'],
    }),
    deleteStockFromWatchlist: builder.mutation({
      query: ({
        userID, listname, position, stock,
      }) => ({
        url: `/users/lists/${userID}/watchlist/${listname}/position/${position}/stock/${stock}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Watchlist'],
    }),
    updateWatchlist: builder.mutation({
      query: ({
        userID, listname, position, list,
      }) => ({
        url: `/users/lists/${userID}/watchlist/${listname}/position/${position}`,
        method: 'POST',
        body: list,
      }),
      invalidatesTags: ['Watchlist'],
    }),
  }),
});

export const {
  useGetUserWatchlistsQuery,
  useAddWatchlistMutation,
  useDeleteWatchlistMutation,
  useUpdateWatchlistNameMutation,
  useAddStockToWatchlistMutation,
  useDeleteStockFromWatchlistMutation,
  useUpdateWatchlistMutation,
} = apiSlice;
