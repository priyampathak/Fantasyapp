import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'data',
    initialState:{
        a_name : "",
        b_name : "",
        stadium : "",
        dates: [],
        time : "" 
    },
    reducers: {
        addplan: (state, action) => {
            state.a_name = action.payload
            state.b_name = action.payload
            state.dates = action.payload
            state.stadium = action.payload
            state.time = action.payload
        }
    }
})