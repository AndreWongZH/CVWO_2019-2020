import axios from 'axios'

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
} from '../constants'

export const updateNav = (title) => {
    return { type: UPDATE_NAV, payload: title}
}

export const loadData = (payload) => {
    return (dispatch) => {
        dispatch(loadDataBegin())
        axios
            .get('/todos')
            .then((res) => {
                dispatch(loadDataSuccess(res.data))
            })
            .catch((err) => {
                dispatch(loadDataFail(err.message))
            })
    }
};

export const loadDataBegin = () => {
    return { type: LOAD_DATA_BEGIN};
};

export const loadDataSuccess = (data) => {
    return { type: LOAD_DATA_SUCCESS, payload: data };
};

export const loadDataFail = (message) => {
    return { type: LOAD_DATA_FAIL, payload: message };
};


export const createTodo = (info) => {
    return (dispatch) => {
        axios
            .post('/todos', {
                title,
                created,
                deadline,
                desc,
                done,
                tag
            } = info)
            .then((res) => {
                dispatch(createTodoSuccess(res.data))
            })
            .catch((err) => {
                dispatch(createTodoFail(err.message))
            })
    }
};

export const createTodoSuccess = (data) => {
    return { type: CREATE_TODO_SUCCESS, payload: data };
};

export const createTodoFail = (message) => {
    return { type: CREATE_TODO_FAIL, payload: message };
};


export const updateTodo = (info) => {
    return (dispatch) => {
        axios
            .put('/todos', {
                params: {
                    info
                }
            })
            .then((res) => {
                dispatch(updateTodoSuccess(res.data))
            })
            .catch((err) => {
                dispatch(updateTodoFail(err.message))
            })
    }
};

export const updateTodoSuccess = (data) => {
    return { type: UPDATE_TODO_SUCCESS, payload: data };
};

export const updateTodoFail = (message) => {
    return { type: UPDATE_TODO_FAIL, payload: message };
};


export const deleteTodo = (id) => {
    return (dispatch) => {
        axios
            .delete('/todos', {
                params: {
                    id
                }
            })
            .then((res) => {
                dispatch(deleteTodoSuccess(res.data))
            })
            .catch((err) => {
                dispatch(deleteTodoFail(err.message))
            })
    }
};

export const deleteTodoSuccess = (data) => {
    return { type: DELETE_TODO_SUCCESS, payload: data };
};

export const deleteTodoFail = (message) => {
    return { type: DELETE_TODO_FAIL, payload: message };
};
