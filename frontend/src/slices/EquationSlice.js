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
            console.log(state.latex);
        },
        SUBMIT: (state, action) => {
            console.log(action.payload);
            if (action.payload === undefined) {
                console.log("FUCK");
                state.equations.push(state.latex);   
            } else {
                console.log("FUCK 2");
                state.equations[action.payload] = state.latex;
            }
            console.log("ME");
            state.latex = "";
            state.edit = null;
        },
        EDIT: (state, action) => {
            state.edit = action.payload;
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