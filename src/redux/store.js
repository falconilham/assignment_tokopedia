import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import dataSlice from './slices/myPokemon';
import modalSlice from './slices/modal';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    modal: modalSlice,
    myPokemon: persistReducer(persistConfig, dataSlice),
});

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});
const persistor = persistStore(store);

const { dispatch } = store;

export { dispatch, persistor, store };