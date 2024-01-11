import { createSlice } from "@reduxjs/toolkit";

const testReducer = createSlice({
    name: 'testReducer',
    initialState: {},
    reducers: {
        testActionRequest: (state, action) => {},
        testActionSuccess: (state, action) => {
            console.log("test action Success")
        },
    }
})

export const TestActions = testReducer.actions

export default testReducer.reducer