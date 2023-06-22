import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import settingReducer from './SettingSlice';
import { combineReducers } from 'redux';

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const rootReducer = combineReducers({
//   user: userReducer,
//   setting: settingReducer
// })

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  // reducer: userReducer
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);