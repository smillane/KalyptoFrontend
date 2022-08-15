import { configureStore } from '@reduxjs/toolkit'
import watchlistReducer from './features/userLists/watchlistSlice'

export default configureStore({
  reducer: {
    watchlists: watchlistReducer
  }
})