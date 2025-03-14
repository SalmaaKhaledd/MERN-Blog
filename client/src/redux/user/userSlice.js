import {createSlice} from '@reduxjs/toolkit';

//initial state of the user slice 

const initialState = {
  currentUser: null,
  error: null,
  loading: false
}
//createSlice is a function that generates a slice object that contains the reducer functions as well as the action creators
//reducers are functions that define how the state can change in response to actions sent to the store

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //action creators 
    //redux toolkit will automatically generate action types that correspond to the string names of the action creators
    signInStart: (state) => {
      state.loading = true;
      state.error=null;
    },
    signInSuccess: (state, action) => {
      state.currentUser= action.payload;
      state.loading = false;
      state.error=null;
    },
    signUpStart: (state) => {
      state.loading = true;
      state.error=null;
    },
    signUpSuccess: (state, action) => {
      state.currentUser= action.payload;
      state.loading = false;
      state.error=null;
    },
    signInFailure: (state, action) => {
      state.error= action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    }
  },
});

export const {signInStart, signInSuccess, signInFailure, updateStart, updateSuccess,updateFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure, signOutSuccess,signUpStart,signUpSuccess} = userSlice.actions;

export default userSlice.reducer;