import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'


//setting up global store object
//registers any reducer functions that are passed to it, and makes the combined reducer available to the rest of the application
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})