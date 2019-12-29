import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import {
    UPDATE_SEARCH,
    UPDATE_SORT,
    WIPE_MESSAGE,
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
    navRoute: '/',
    message: '',
    sort: {
        heading: 'deadline',
        direction: 'ascending',
        search: ''
    }
}

function rootReducer(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case UPDATE_SEARCH:
            return {
                ...state,
                loading: true,
                sort: {
                    ...state.sort,
                    search: action.payload.search
                }
            }
        case UPDATE_SORT:
            return {
                ...state,
                loading: true,
                sort: {
                    ...state.sort,
                    heading: action.payload.heading,
                    direction: action.payload.direction
                }
            }
        case WIPE_MESSAGE:
            return {
                ...state,
                message: ''
            }
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
        case LOAD_DATA_FAIL:
            return {
                ...state,
                laoding: false,
                message: 'Failed to load data'
            }
        case CREATE_TODO_SUCCESS:
            return {
                ...state,
                message: 'New todo has been added!'
            }
        case CREATE_TODO_FAIL:
            return {
                ...state,
                message: 'Failed to create a todo'
            }
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                message: 'Todo has been updated'
            }
        case UPDATE_TODO_FAIL:
            return {
                ...state,
                message: 'Failed to update a todo'
            }
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                message: 'Todo has been deleted'
            }
        case DELETE_TODO_FAIL:
            return {
                ...state,
                message: 'Failed to delete a todo'
            }
        default:
            return state
    }
}

export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
}