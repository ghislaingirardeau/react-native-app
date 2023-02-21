import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, combineReducers } from "redux";
import CountReducer from "./reducers/cardsReducer";

const persistConfig = {
  key: "rootFlashCard",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  flashCards: persistReducer(persistConfig, CountReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);

/* import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

import todoReducer from './reducers';
import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, todoReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store) */
