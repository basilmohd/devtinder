import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name: "request",
    initialState: null, 
    reducers: {
        addRequests : (state, action) => { return action.payload},
        removeRequest : (state, action) => { ()=>{
            let newArray = state.filter((req)=> req._id !== action.payload);
            return newArray;
        }}
    }
});

export const { addRequests, removeRequest } = requestSlice.actions ;
export default requestSlice.reducer ;