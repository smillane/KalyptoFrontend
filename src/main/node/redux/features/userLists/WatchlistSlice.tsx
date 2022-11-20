/* eslint-disable dot-notation */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../../../api/client.tsx';

export const fetchWatchlistsQuery = createAsyncThunk(
  'users/fetchLists',
  async (data, thunkAPI) => {
    const { userID } = data;
    if (userID !== null) {
      const response = await client(`users/lists/${userID}`, 'GET');
      if (response.response.ok) {
        console.log('response ok', response.data);
        return response.data;
      }
    }
    return [];
  },
);

export const addWatchlistQuery = createAsyncThunk(
  'users/addNewList',
  async (data, thunkAPI) => {
    const {
      userID, listName, position,
    } = data;
    if (userID !== null) {
      const response = await client(`users/lists/${userID}/watchlist/${listName}/position/${position}`, 'POST');
      if (response.response.ok) {
        const newList = {};
        newList['watchlist'] = [];
        newList['position'] = position;
        newList['watchlistName'] = listName;
        return newList;
      }
    }
    return null;
  },
);

interface WatchlistsState {
  data: []
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  data: [],
  status: 'idle',
  error: null,
} as WatchlistsState;

// add an async thunk functionality for when the list is
// updated/changeOrder/addList to call API with necessary information
const WatchlistSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    removeList(state, action) {
      const newState = state.data.filter(
        (i) => !Object.prototype.hasOwnProperty.call(i, action.payload),
      );
      return newState;
    },
    updateListName(state, action) {
      const { oldName, newName } = action.payload;
      const newState = state.data.map((obj) => Object.fromEntries(
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
  extraReducers(builder) {
    builder
      .addCase(fetchWatchlistsQuery.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchWatchlistsQuery.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchWatchlistsQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addWatchlistQuery.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addWatchlistQuery.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addWatchlistQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  removeList, updateListName, changeOrder,
} = WatchlistSlice.actions;

export default WatchlistSlice.reducer;

export const getWatchlists = (state) => state.data;
