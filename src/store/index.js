import { configureStore } from '@reduxjs/toolkit';
import categories from '../pages/categoriesSlice';
import questions from '../pages/questionsSlice';

const store = configureStore({
    reducer: {categories, questions},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production', 
})

export default store;