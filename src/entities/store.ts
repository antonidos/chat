import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice'
import searchReducer from './slices/search/searchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer
  },
});

export type AppDispatch = typeof store.dispatch;