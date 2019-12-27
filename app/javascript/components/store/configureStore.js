import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import {
    UPDATE_NAV,
    LOAD_DATA_BEGIN,
    LOAD_DATA_SUCCESS,
    LOAD_DATA_FAIL,
    CREATE_TODO_FAIL,
    CREATE_TODO_SUCCESS,
    UPDATE_TODO_FAIL,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO_FAIL,
    DELETE_TODO_SUCCESS
} from './constants'

const initialState = {
    todos: [],
    loading: true,
    navRoute: '/'
}

function rootReducer(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case UPDATE_NAV:
            return {
                ...state,
                navRoute: action.payload
            }
        case LOAD_DATA_BEGIN:
            return {
                ...state,
                loading: true
            }
        case LOAD_DATA_SUCCESS:
            return { 
                ...state,
                todos: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
}