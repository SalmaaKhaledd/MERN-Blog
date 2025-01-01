import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { get, version } from 'mongoose'


const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key:'root', 
  storage,
  version: 1,
};


const persistedReducer = persistReducer(persistConfig, rootReducer) 

//setting up global store object
//registers any reducer functions that are passed to it, and makes the combined reducer available to the rest of the application
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});

export const persistor = persistStore(store);