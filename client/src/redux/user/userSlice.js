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
    signInSucces: (state, action) => {
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
  },
});

export const {signInStart, signInSucces, signInFailure, updateStart, updateSuccess,updateFailure} = userSlice.actions;

export default userSlice.reducer;