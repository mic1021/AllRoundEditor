import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const selectEquation = state => state.equations.equations
export const selectLatex = state => state.equations.latex
export const selectChecked = state => state.equations.checked
export const selectCursor = state => state.equations.cursor
export const selectShowDialogue = state => state.equations.showDialogue
export const selectMathCmd = state => state.equations.mathCmd
export const selectLoggedIn = state => state.equations.loggedIn
export const selectSubmitted = state => state.equations.submitted

const initialState = {
    latex: "",
    equations: [
        'x + 3 = 1',
        'x + 2 = 1',
        'x + 1 = 1',
    ],
    checked: [],
    edit: null,
    cursor: 0,
    showDialogue: false,
    latexCmd: '',
    loggedIn: false,
    submitted: [],
}

export const EquationSlice = createSlice({
    name: 'equations',
    initialState,
    reducers: {
        INITCHECK: state => {
            state.checked = [];
            state.equations.forEach(() => {
                state.checked.push(false);
            });
        },
        TOGGLE: (state, action) => {
            if (state.checked[action.payload] === false || state.checked[action.payload] === undefined) state.checked[action.payload] = true;
            else state.checked[action.payload] = false;
        },
        TYPE: (state, action) => {
            state.latex = action.payload;
        },
        SUBMIT: state => {
            if (state.edit === null) {
                state.equations.push(state.latex);
                state.checked.push(false);
                console.log(state.latex);
            } else {
                state.equations[state.edit] = state.latex;
            }
            let equation = {
                equation: state.latex
            }
            axios.post(`${process.env.REACT_APP_API}/submitEquation`, equation)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
            state.latex = "";
            state.edit = null;
        },
        EDIT: (state, action) => {
            state.edit = action.payload;
            state.latex = state.equations[action.payload];
        },
        DELETE: (state, action) => {
            state.equations.splice(action.payload, 1);
            state.checked.splice(action.payload, 1);
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
        },
        SEND: state => {
            state.submitted = [...state.equations];
            state = []
        }
    }
})

export const { INITCHECK, TOGGLE, TYPE, SUBMIT, EDIT, DELETE, CURSOR, toggleDialogue, LOGIN, MATHCMD, SEND } = EquationSlice.actions

export default EquationSlice.reducer

//USE CONNECT INSTEAD OF SUBSCRIBE TO FIX RERENDERING ISSUE