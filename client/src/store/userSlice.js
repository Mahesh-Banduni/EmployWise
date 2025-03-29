import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
  selecteduser: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.data || [];
    },
    setSelectedUser: (state, action) => {
      state.selecteduser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setUsers, 
  setSelectedUser,
  setFilters, 
  setLoading, 
  setError 
} = userSlice.actions;

export default userSlice.reducer;