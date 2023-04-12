import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../hooks/http.hook';

const initialState = {
    questions: [],
    questionsLoadingStatus: 'idle'
}

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async () => {
        const {request} = useHttp();
        const data = await request("https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple");
        return data.results;
    }
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, state => {state.questionsLoadingStatus = 'loading'})
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.questionsLoadingStatus = 'idle';
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, state => {
                state.questionsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = questionsSlice;

export default reducer;

export const {
    questionsFetching,
    questionsFetched,
    questionsFetchingError
} = actions;