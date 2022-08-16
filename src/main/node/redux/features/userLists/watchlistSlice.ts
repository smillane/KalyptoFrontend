import { createSlice } from '@reduxjs/toolkit'

// will initially fetch from async server-side api call to get initial state, which is users lists
// if no lists created, will create an empty list for initial state
const initialState = [
  {"tech": ["amd", "nvda", "net", "crwd"]}, 
  {"oil": ["bp", "shel", "shell", "oxy"]}
];

const watchlistSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    addList(state, action) {
      state.push(action.payload)
    },
    removeList(state, action) {
      const newState = state.filter(i => !i.hasOwnProperty(action.payload))
      return newState
    },
    updateListName(state, action) {
      state.map((i) => {i: action.payload})
    },
    changeOrder: (state) => {},
  },
})

export const { addList, removeList, updateListName, changeOrder } = watchlistSlice.actions

export default watchlistSlice.reducer