import { createSlice } from '@reduxjs/toolkit';

export const selectEquation = state => state.equations.equations
export const selectLatex = state => state.equations.latex
export const selectChecked = state => state.equations.checked
export const selectCursor = state => state.equations.cursor
export const selectShowDialogue = state => state.equations.showDialogue
export const selectMathCmd = state => state.equations.mathCmd
export const selectLoggedIn = state => state.equations.loggedIn

export const EquationSlice = createSlice({
    name: 'equations',
    initialState: {
        latex: "",
        equations: [
            "x + 3 = 3",
            "x + 1 = 2",
            "x + 5 = 3"
        ],
        checked: [],
        edit: null,
        cursor: 0,
        showDialogue: false,
        latexCmd: '',
        loggedIn: false,
        showDialogue: false
    },
    reducers: {
        INITCHECK: state => {
            state.checked = [];
            state.equations.forEach(() => {
                state.checked.push(false);
            });
        },
        TOGGLE: (state, action) => {
            if (state.checked[action.payload] === false) state.checked[action.payload] = true;
            else state.checked[action.payload] = false;
        },
        TYPE: (state, action) => {
            state.latex = action.payload;
        },
        SUBMIT: state => {
            if (state.edit === null) {
                state.equations.push(state.latex);
                state.checked.push(false);
            } else {
                state.equations[state.edit] = state.latex;
            }
            state.latex = "";
            state.edit = null;
        },
        EDIT: (state, action) => {
            state.edit = action.payload;
            state.latex = state.equations[action.payload];
        },
        DELETE: (state, action) => {
            //ACTION.PAYLOAD IS INDEX VALUE
            //DELETE EQUATION
            state.equations.splice(action.payload, 1);
            state.checked.splice(action.payload, 1);
        },
        SAVE: (state, action) => {
            //ACTION.PAYLOAD IS AN ARRAY OF CHECKED LIST
            //SAVE TO BACKEND
        },
        CURSOR: (state,action) => {
            state.cursor = action.payload;
        },
        toggleDialogue: (state, action) => {
            state.showDialogue = !(state.showDialogue);
            state.mathCmd = action.payload;
        },
        LOGIN: state => {
            state.loggedIn = !(state.loggedIn);
        },
        MATHCMD: (state,action) => {
            state.mathCmd = action.payload;
        }
    }
})

export const { INITCHECK, TOGGLE, TYPE, SUBMIT, EDIT, DELETE, CURSOR, SAVE, toggleDialogue, LOGIN, MATHCMD } = EquationSlice.actions

export default EquationSlice.reducer

//USE CONNECT INSTEAD OF SUBSCRIBE TO FIX RERENDERING ISSUE