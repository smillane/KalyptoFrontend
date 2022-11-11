import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from '../../../api/client.tsx';

// will initially fetch from async server-side api call to get initial state, which is users lists
// if no lists created, will create an empty list for initial state
const initialStateDummyData = [{
  tech: {
    amd: {
      latestPrice: 62.12,
      changePercent: -0.0048,
    },
    nvda: {
      latestPrice: 120.02,
      changePercent: -0.0148,
    },
    net: {
      latestPrice: 89.02,
      changePercent: -0.0341,
    },
    crwd: {
      latestPrice: 198.00,
      changePercent: -0.0018,
    },
  },
}, {
  oil: {
    bp: {
      latestPrice: 42.61,
      changePercent: 0.0348,
    },
    shel: {
      latestPrice: 52.57,
      changePercent: 0.0241,
    },
    eog: {
      latestPrice: 130.10,
      changePercent: 0.0097,
    },
    oxy: {
      latestPrice: 45.91,
      changePercent: 0.0122,
    },
  },
}];

interface UsersState {
  data: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  data: [],
  status: 'idle',
} as UsersState;

export const FetchWatchlistsQuery = createAsyncThunk(
  'users/fetchLists',
  async (data, thunkAPI) => {
    const { user } = data;
    if (user.id === null) {
      const response = await client(`users/lists/${user.id}`, 'GET');
      return response.data;
    }
    return [];
  },
);

export const AddWatchlistQuery = createAsyncThunk(
  'users/addNewList',
  async (data, thunkAPI) => {
    const {
      user, listName, position,
    } = data;
    if (user.id === null) {
      console.log(user.firebaseUser.uid, listName, position);
      const response = await client(`users/lists/${user.id}/watchlist/${listName}/position/${position}`, 'POST');
      return response.data;
    }
    return null;
  },
);

// add an async thunk functionality for when the list is
// updated/changeOrder/addList to call API with necessary information
const WatchlistSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    // addList(state, action) {
    //   state.data.push(action.payload);
    // },
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
      .addCase(FetchWatchlistsQuery.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(FetchWatchlistsQuery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.watchlists = state.watchlists.concat(action.payload);
      })
      .addCase(FetchWatchlistsQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(AddWatchlistQuery.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(AddWatchlistQuery.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(AddWatchlistQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  removeList, updateListName, changeOrder,
} = WatchlistSlice.actions;

export default WatchlistSlice.reducer;

export const selectAllWatchlists = (state) => state.watchlists.data;
