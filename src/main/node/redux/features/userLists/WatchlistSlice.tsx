import { createSlice } from '@reduxjs/toolkit';

// will initially fetch from async server-side api call to get initial state, which is users lists
// if no lists created, will create an empty list for initial state
const initialState = [{ tech: ['amd', 'nvda', 'net', 'crwd'] }, { oil: ['bp', 'shel', 'shell', 'oxy'] }];

// add an async thunk functionality for when the list is
// updated/changeOrder/addList to call API with necessary information
const WatchlistSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    addList(state, action) {
      state.push(action.payload);
    },
    removeList(state, action) {
      const newState = state.filter(
        (i) => !Object.prototype.hasOwnProperty.call(i, action.payload),
      );
      return newState;
    },
    updateListName(state, action) {
      const { oldName, newName } = action.payload;
      const newState = state.map((obj) => Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
          if (key === oldName) {
            return [newName, value];
          }
          return [key, value];
        }),
      ));
      return newState;
    },
    changeOrder: (state, action) => {
      const newState = action.payload;
      return newState;
    },
  },
});

export const {
  addList, removeList, updateListName, changeOrder,
} = WatchlistSlice.actions;

export default WatchlistSlice.reducer;
