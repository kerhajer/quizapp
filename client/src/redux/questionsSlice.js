
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch quiz questions
export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/questions`,_);

        return data
    
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchQuestionsbyid = createAsyncThunk(
  'questions/fetchQuestionsbyid',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/questions/find/${id}`);

      return data;
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
    que:{},
    trace: 0,
    isLoading: false,
    serverError: null,
  },
  reducers: {
  
    moveNextAction: (state) => {
      state.trace += 1;
    },
    movePrevAction: (state) => {
      state.trace -= 1;
    },
    resetAllAction: (state) => {
      state.que = {};
      state.questions = [];
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
        state.questions= payload;
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
        state.que = payload;

      })
      .addCase(insertQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError = action.payload;
      })
      .addCase(fetchQuestionsbyid.fulfilled, (state, action) => {
        state.questions = action.payload;

      })
  },
});

export const {  moveNextAction, movePrevAction, resetAllAction } = questionsSlice.actions;

export default questionsSlice.reducer;