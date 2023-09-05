import { createSlice } from "@reduxjs/toolkit"

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
    }
})

export const { setUserId, pushResultAction, resetResultAction, updateResultAction } = resultSlice.actions;

export default resultSlice.reducer;