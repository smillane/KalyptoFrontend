import { configureStore } from '@reduxjs/toolkit';
import WatchlistSlice from './features/userLists/WatchlistSlice';
import WatchlistReducer from './features/userLists/WatchlistSlice';

// export const store = configureStore({
//   reducer: {
//     watchlists: WatchlistReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(WatchlistSlice.middleware),
// });

export const store = configureStore({
  reducer: {
    watchlists: WatchlistReducer,
  },
});
