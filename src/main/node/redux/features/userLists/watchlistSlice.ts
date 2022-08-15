import { createSlice } from '@reduxjs/toolkit'

// will initially fetch from server-side api call to get initial state, which is users lists
const initialState = [{"tech": ["amd", "nvda", "net", "crwd"]}, {"oil": ["bp", "shel", "shell", "oxy"]}];

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addList(state, action) {
      state.push(action.payload)
    },
    removeList(state, action) {
      state.filter(e => e !== action.payload)
    },
    changeOrder: (state) => {},
  },
})

export const { addList, removeList, changeOrder } = watchlistSlice.actions

export default watchlistSlice.reducer