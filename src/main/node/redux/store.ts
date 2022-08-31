import { configureStore } from '@reduxjs/toolkit'
import WatchlistReducer from './features/userLists/WatchlistSlice'

export const store = configureStore({
  reducer: {
    watchlists: WatchlistReducer
  }
})