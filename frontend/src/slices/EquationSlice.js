import { createSlice } from '@reduxjs/toolkit';

export const selectEquation = state => state.equations.equations
export const selectLatex = state => state.equations.latex

export const EquationSlice = createSlice({
    name: 'equations',
    initialState: {
        latex: "",
        equations: [
            "x + 3 = 3",
            "x + 1 = 2",
            "x + 5 = 3"
        ],
        edit: null
    },
    reducers: {
        TYPE: (state, action) => {
            state.latex = action.payload;
        },
        SUBMIT: state => {
            if (state.edit === null) {
                state.equations.push(state.latex);   
            } else {
                state.equations[state.edit] = state.latex;
            }
            state.latex = "";
            state.edit = null;
        },
        EDIT: (state, action) => {
            state.edit = action.payload;
            //console.log(state.edit);
            state.latex = state.equations[action.payload];
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