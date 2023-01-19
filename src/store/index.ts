import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { createFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';

import toolsReducer from './../features/ToolsList/toolsListSlice';

const isProductionEnvironment = process.env.NODE_ENV === `production`;

const STORAGE_KEY = `LUANCODE_TOOLS`;

const reducers = combineReducers({
  tools: toolsReducer,
});

const importantToolsPropertiesFilter = createFilter(`tools`, [
  `all`,
  `revalidateIn`,
]);

const persistConfig = {
  key: STORAGE_KEY,
  storage,
  whitelist: [`tools`],
  transforms: [importantToolsPropertiesFilter],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: !isProductionEnvironment,
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
