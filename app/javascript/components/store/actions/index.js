import axios from 'axios'

import {
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
} from '../constants'

export const wipeMessage = () => {
    return { type: WIPE_MESSAGE }
}

export const updateNav = (title) => {
    return { type: UPDATE_NAV, payload: title}
}

export const loadData = () => {
    return (dispatch) => {
        dispatch(loadDataBegin())
        axios
            .get(`/todos`)
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


export const createTodo = ({ title, created, deadline, desc, done, tag }) => {
    return (dispatch) => {
        axios
            .post('/todos', {
                title,
                created,
                deadline,
                desc,
                done,
                tag
            })
            .then((res) => {
                dispatch(createTodoSuccess())
            })
            .catch((err) => {
                dispatch(createTodoFail())
            })
    }
};

export const createTodoSuccess = () => {
    return { type: CREATE_TODO_SUCCESS };
};

export const createTodoFail = () => {
    return { type: CREATE_TODO_FAIL };
};


export const updateTodo = ({ id, title, created, deadline, desc, done, tag }) => {
    return (dispatch) => {
        axios
            .put(`/todos/${id}`, {
                title,
                created,
                deadline,
                desc,
                done,
                tag
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
            .delete(`/todos/${id}`)
            .then((res) => {
                console.log(res)
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
