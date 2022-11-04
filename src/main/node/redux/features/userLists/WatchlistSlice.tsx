import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import React, { createContext, useContext } from 'react';
import 'firebase/compat/auth';
import { useAuthUser } from 'next-firebase-auth';

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

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const AuthStateContext = createContext(null);

export function fetchWatchlists() {
  const authState: boolean = useContext(AuthStateContext);
  if (authState !== false) {
    const user = useAuthUser();
    createAsyncThunk('users/lists', async () => {
      const response = await client(user.firebaseUser.uid, 'GET');
      return response.data;
    });
  }
  return [];
}

// add an async thunk functionality for when the list is
// updated/changeOrder/addList to call API with necessary information
const WatchlistSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    addList(state, action) {
      state.data.push(action.payload);
    },
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
});

export const {
  addList, removeList, updateListName, changeOrder,
} = WatchlistSlice.actions;

export default WatchlistSlice.reducer;
