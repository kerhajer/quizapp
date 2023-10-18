
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getResult = createAsyncThunk(
  'result/getResult',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/results/`,_);

        return data
    
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const GetResultbyid = createAsyncThunk(
  'result/GetResultbyid',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/results/${id}`,id);

        return data
    
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);






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
                results : [],
                voirresultat :{},
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(storeResult.fulfilled, (state,action) => {
            state.results=action.payload;

          })
         
          .addCase(getResult.fulfilled, (state,{ type,payload}) => {
            state.results= payload;
          })
          .addCase(GetResultbyid.fulfilled, (state,action) => {
            state.voirresultat= action.payload;
          })
        },
    });


export const { setUserId, pushResultAction, resetResultAction, updateResultAction } = resultSlice.actions;

export default resultSlice.reducer;