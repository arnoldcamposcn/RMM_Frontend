import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice.ts';
import authReducer from './features/auth/auth.slice.ts';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }), // opcional si usas no-serializables
});

// Tipos inferidos para todo el proyecto
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
