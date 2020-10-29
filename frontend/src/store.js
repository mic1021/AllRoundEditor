import {createStore} from 'redux';

export default createStore(function(state, action) {
    if (state === undefined) {
        return {
            equations: [
                {id: 1, equation: 'x + 1 = 3', checked: false},
                {id: 2, equation: 'x + 2 = 3', checked: false},
                {id: 3, equation: 'x + 3 = 3', checked: false},
                {id: 4, equation: 'x + 4 = 3', checked: false}
            ]
        }
    }
    if (action.type === 'EDIT') {
        return {...state} //change equations
    }
    if (action.type === 'DELETE') {
        return {...state} //delete equations
    }
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())