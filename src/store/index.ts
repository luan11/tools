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

const STORAGE_KEY = `LUANCODE_TOOLS`;

const reducers = combineReducers({
  tools: toolsReducer,
});

const onlyToolsFilter = createFilter(`tools`, [`all`, `revalidateIn`]);

const persistConfig = {
  key: STORAGE_KEY,
  storage,
  whitelist: [`tools`],
  transforms: [onlyToolsFilter],
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
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
