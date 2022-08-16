import { configureStore } from '@reduxjs/toolkit'
import watchlistReducer from './features/userLists/watchlistSlice'

export const store = configureStore({
  reducer: {
    watchlists: watchlistReducer
  }
})