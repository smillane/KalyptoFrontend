import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/userLists/WatchlistSlice.tsx';

// export const store = configureStore({
//   reducer: {
//     watchlists: WatchlistReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(WatchlistSlice.middleware),
// });

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
