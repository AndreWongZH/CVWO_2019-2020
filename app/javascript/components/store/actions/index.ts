import axios from 'axios';

import {
  UPDATE_CATEGORY,
  LOAD_FOCUS_BEGIN,
  LOAD_FOCUS_SUCCESS,
  LOAD_FOCUS_FAIL,
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
  DELETE_TODO_SUCCESS,
} from '../constants';

import { TodoObject, UpdateTableValues, ReduxState, UpdateCategoryData } from '../../TypeDeclarations';


// Action used to toggle focus category visiblity
export const updateCategory = (data: UpdateCategoryData) => {
  return { type: UPDATE_CATEGORY, payload: data };
};


// Actions used to load data for focus page
export const loadFocusBegin = () => {
  return { type: LOAD_FOCUS_BEGIN };
};

export const loadFocusSuccess = (data: ReduxState["focus"]) => {
  return { type: LOAD_FOCUS_SUCCESS, payload: data };
};

export const loadFocusFail = () => {
  return { type: LOAD_FOCUS_FAIL };
};

export const loadFocus = () => {
  return (dispatch: Function) => {
    dispatch(loadFocusBegin());
    axios
      .get('/todos/focus')
      .then((res) => {
        dispatch(loadFocusSuccess(res.data));
      })
      .catch(() => {
        dispatch(loadFocusFail());
      });
  };
};


// Action used to wipe flash message
export const wipeMessage = () => {
  return { type: WIPE_MESSAGE };
};


// Action to update navigation active
export const updateNav = ({ title, loading }: { title: string, loading?: Boolean }) => {
  return { type: UPDATE_NAV, payload: {title, loading} };
};


// Actions for loading data
export const loadDataBegin = () => {
  return { type: LOAD_DATA_BEGIN };
};

export const loadDataSuccess = (data: ReduxState["todos"]) => {
  return { type: LOAD_DATA_SUCCESS, payload: data };
};

export const loadDataFail = () => {
  return { type: LOAD_DATA_FAIL };
};

export const loadData = () => {
  return (dispatch: Function, getState: Function) => {
    dispatch(loadDataBegin());
    const link = `/todos/?sort=${getState().sort.heading}&ascend=${getState().sort.direction}&search=${getState().sort.search}`;
    axios
      .get(link)
      .then((res) => {
        dispatch(loadDataSuccess(res.data));
      })
      .catch(() => {
        dispatch(loadDataFail());
      });
  };
};


// Actions used to update search and sort query
export const updateSearch = (searchValue: UpdateTableValues) => {
  return { type: UPDATE_SEARCH, payload: searchValue };
};

export const updateSort = (sortValues: UpdateTableValues) => {
  return { type: UPDATE_SORT, payload: sortValues };
};

export const updateTable = (values: UpdateTableValues) => {
  return (dispatch: Function) => {
    if (values.search === undefined) {
      dispatch(updateSort(values));
    } else {
      dispatch(updateSearch(values));
    }
    dispatch(loadData());
  };
};


// Actions for creating a todo
export const createTodoSuccess = () => {
  return { type: CREATE_TODO_SUCCESS };
};

export const createTodoFail = () => {
  return { type: CREATE_TODO_FAIL };
};

export const createTodo = ({
  title, created, deadline, desc, done, tag,
}: TodoObject) => {
  return (dispatch: Function) => {
    axios
      .post('/todos', {
        title,
        created,
        deadline,
        desc,
        done,
        tag,
      })
      .then(() => {
        dispatch(createTodoSuccess());
      })
      .catch(() => {
        dispatch(createTodoFail());
      });
  };
};


// Actions for updating a todo
export const updateTodoSuccess = () => {
  return { type: UPDATE_TODO_SUCCESS };
};

export const updateTodoFail = () => {
  return { type: UPDATE_TODO_FAIL };
};

export const updateTodo = ({
  id, title, created, deadline, desc, done, tag,
}: TodoObject) => {
  return (dispatch: Function) => {
    axios
      .put(`/todos/${id}`, {
        title,
        created,
        deadline,
        desc,
        done,
        tag,
      })
      .then(() => {
        dispatch(updateTodoSuccess());
      })
      .catch(() => {
        dispatch(updateTodoFail());
      });
  };
};


// Actions for deleting a todo
export const deleteTodoSuccess = () => {
  return { type: DELETE_TODO_SUCCESS };
};

export const deleteTodoFail = () => {
  return { type: DELETE_TODO_FAIL };
};

export const deleteTodo = (id: string) => {
  return (dispatch: Function) => {
    axios
      .delete(`/todos/${id}`)
      .then(() => {
        dispatch(deleteTodoSuccess());
      })
      .catch(() => {
        dispatch(deleteTodoFail());
      });
  };
};
