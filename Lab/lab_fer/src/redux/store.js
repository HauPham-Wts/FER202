// Redux Store - Lab 6
import { configureStore } from '@reduxjs/toolkit';
import orchidsReducer from './orchidsSlice';

export const store = configureStore({
  reducer: {
    orchids: orchidsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // Enable Redux DevTools
  devTools: process.env.NODE_ENV !== 'production',
});

// Debug: Log initial state
console.log('🔴 Redux Store initialized:', store.getState());

export default store;
