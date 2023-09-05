

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch quiz questions
export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/questions`);

      const { questions, answers } = data;
  
        dispatch(startExamAction({ question: questions, answers }));
        return questions;
    
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);











export const insertQuestions = createAsyncThunk('questions/insertQuestions', async (insertedData, { rejectWithValue, dispatch }) => {
      try {
        const { data } = await axios.post(`http://localhost:5000/api/questions`,insertedData);

          return data;
          
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );






// Create questions slice
const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    queue: [],
    answers: [],
    trace: 0,
    isLoading: false,
    serverError: null,
  },
  reducers: {
    startExamAction: (state, action) => {
      const { question, answers } = action.payload;
      state.queue = question;
      state.answers = answers;
    },
    moveNextAction: (state) => {
      state.trace += 1;
    },
    movePrevAction: (state) => {
      state.trace -= 1;
    },
    resetAllAction: (state) => {
      state.queue = [];
      state.answers = [];
      state.trace = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
        state.serverError = null; // Reset the error when fetching
      })
      .addCase(fetchQuestions.fulfilled, (state,{ type,payload}) => {
        state.isLoading = false;
        state.questions= payload.question;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError = action.payload;
      })
      .addCase(insertQuestions.pending, (state) => {
        state.isLoading = true;
        state.serverError = null; // Reset the error when fetching
      })
      .addCase(insertQuestions.fulfilled, (state, {type,payload}) => {
        state.isLoading = false;
        state.questions = payload.insertedData;
      })
      .addCase(insertQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError = action.payload;
      });
  },
});

export const { startExamAction, moveNextAction, movePrevAction, resetAllAction } = questionsSlice.actions;

export default questionsSlice.reducer;