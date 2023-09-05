import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import resultreducer from './resultSlice';
import questionsreducer from './questionsSlice';

const rootReducer = combineReducers({
  questionsreducer,
  resultreducer,
});
const persistConfig = {
   key: 'root',
   storage, // Use the storage mechanism you want
   // You can also configure blacklist or whitelist here
 };
 
 const persistedReducer = persistReducer(persistConfig, rootReducer);
 
 export const store = configureStore({
   reducer: persistedReducer, // Use the persisted reducer
 });
 
 export const Persistor = persistStore(store);