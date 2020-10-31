import createSlice from '@reduxjs/toolkit';

export const selectEquation = state => state.equations.data

export const EquationSlice = createSlice({
    name: 'equations',
    initialState: {
        data: []
    },
    reducers: {
        //submit: state=>
    }
})

//USE CONNECT INSTEAD OF SUBSCRIBE TO FIX RERENDERING ISSUE