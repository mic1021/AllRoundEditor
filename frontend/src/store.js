import {createStore} from 'redux';

export default createStore(function(state, action) {
    if (state === undefined) {
        return {
            id: 4,
            equations: [
                {id: 1, equation: 'x + 1 = 3', checked: false},
                {id: 2, equation: 'x + 2 = 3', checked: false},
                {id: 3, equation: 'x + 3 = 3', checked: false},
                {id: 4, equation: 'x + 4 = 3', checked: false}
            ],
            latex: ""
        }
    }

    if (action.type === 'SUBMIT') {
        console.log(action.type);
        console.log(state);
        state.id = state.id + 1;
        return {
            ...state,
            id: state.id,
            equations: [
                ...state.equations,
                {
                    id: state.id,
                    equation: state.latex,
                    checked: false
                }
            ],
            latex: ""
        }
    }

    if (action.type === 'EDIT') {
        //console.log(state.latex)
        return {
            ...state,
            latex: action.latex
        } //change equations
    }

    if (action.type === 'DELETE') {
        return {...state} //delete equations
    }

    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())