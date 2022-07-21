import { applyMiddleware } from 'redux';
import rootReducer from '../reducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { legacy_createStore as createStore } from 'redux'

let loggerMiddleware = createLogger();


export default function configureStore(initialState) {

    return createStore(rootReducer, initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );

}
