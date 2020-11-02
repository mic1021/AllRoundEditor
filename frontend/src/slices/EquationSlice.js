import { createSlice } from '@reduxjs/toolkit';

export const selectEquation = state => state.equations.equations
export const selectLatex = state => state.equations.latex

export const EquationSlice = createSlice({
    name: 'equations',
    initialState: {
        latex: "",
        equations: []
    },
    reducers: {
        TYPE: (state, action) => {
            state.latex = action.payload;
            console.log(state.latex);
        },
        SUBMIT: (state, action) => {
            if (action.payload === 'NEW') {
                state.equations.push(state.latex);   
            }
            else state.equations[action.payload] = state.latex;
            state.latex = "";
        },
        EDIT: (state, action) => {
            state.latex = state.data[action.payload].equation;
        },
        DELETE: (state, action) => {
            //ACTION.PAYLOAD IS INDEX VALUE
            //DELETE EQUATION
        },

        SAVE: (state, action) => {
            //ACTION.PAYLOAD IS AN ARRAY OF CHECKED LIST
            //SAVE TO BACKEND
        }
    }
})

export const { TYPE, SUBMIT, EDIT, DELETE } = EquationSlice.actions

export default EquationSlice.reducer

//USE CONNECT INSTEAD OF SUBSCRIBE TO FIX RERENDERING ISSUE