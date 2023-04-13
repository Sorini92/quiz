/* import { configureStore } from '@reduxjs/toolkit';
import categories from '../pages/categoriesSlice';
import questions from '../pages/questionsSlice';

const store = configureStore({
    reducer: {categories, questions},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production', 
})

export default store; */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
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
import storage from 'redux-persist/lib/storage';

import categories from '../pages/categoriesSlice';
import questions from '../pages/questionsSlice';

const rootReducer = combineReducers({
	categories, 
	questions
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['categories']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
	devTools: process.env.NODE_ENV !== 'production', 
})

export const persistor = persistStore(store);

export default store;