import { configureStore } from '@reduxjs/toolkit';
import equationReducer from './slices/EquationSlice';

export default configureStore({
    reducer: {
        equations: equationReducer
    }
} , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())