import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// If you have more reducers, add them here
const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
