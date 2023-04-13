import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../hooks/http.hook';

const initialState = {
    questions: [],
    questionsLoadingStatus: 'idle',
    questionIndex: 0,
    score: 0
}

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async (setting) => {
        const {request} = useHttp();
        const data = await request(`https://opentdb.com/api.php?amount=${setting.number}&category=${setting.category}&difficulty=${setting.difficulty}&type=${setting.type}`);
        return data.results;
    }
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addScore: (state, action) => {state.score = state.score + action.payload},
        changeQuestionIndex: (state, action) => {state.questionIndex = state.questionIndex + action.payload},
        clear: (state) => {
            state.score = 0;
            state.questionIndex = 0;
        },
    },
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
    clear,
    changeQuestionIndex,
    addScore,
    questionsFetching,
    questionsFetched,
    questionsFetchingError
} = actions;