import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../hooks/http.hook';

const initialState = {
    categories: [],
    categoriesLoadingStatus: 'idle',
    setting: {}
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const {request} = useHttp();
        const data = await request("https://opentdb.com/api_category.php");
        return data.trivia_categories
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addSetting: (state, actions) => {state.setting = actions.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, state => {state.categoriesLoadingStatus = 'loading'})
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoriesLoadingStatus = 'idle';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, state => {
                state.categoriesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = categoriesSlice;

export default reducer;

export const {
    addSetting,
    categoriesFetching,
    categoriesFetched,
    categoriesFetchingError
} = actions;