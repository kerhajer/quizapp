
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const storeResult = createAsyncThunk(
    'result/storeResult',
    async (resultData, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/results/`,
          resultData
        );
        return data;
      } catch (error) {
        console.error('Error storing result:', error);
        return rejectWithValue(error.message);
      }
    }
  );
  
  
  

export const resultSlice = createSlice({
    name: 'result',
    initialState : {
        userId : null,
        results : []
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        pushResultAction : (state, action) => {
            state.results.push(action.payload)
        },
        updateResultAction : (state, action) => {
            const { trace, checked } = action.payload;
            state.results.fill(checked, trace, trace + 1)
        },
        resetResultAction : () => {
            return {
                userId : null,
                results : []
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(storeResult.fulfilled, (state,{type,payload}) => {
            state.results=payload;

          })
      },
    });


export const { setUserId, pushResultAction, resetResultAction, updateResultAction } = resultSlice.actions;

export default resultSlice.reducer;