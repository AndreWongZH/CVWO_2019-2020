import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  LOAD_TAGS_BEGIN,
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS_FAIL,
  UPDATE_CATEGORY,
  LOAD_FOCUS_BEGIN,
  LOAD_FOCUS_SUCCESS,
  LOAD_FOCUS_FAIL,
  UPDATE_SEARCH,
  UPDATE_SORT,
  UPDATE_TAG,
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
} from './constants';

import { modifyTagsJsonInput } from './middleware';

const initialState = {
  todos: Array,
  loading: true,
  tagsLoading: true,
  navRoute: '/',
  message: '',
  // for query parameters
  sort: {
    heading: 'deadline',
    direction: 'ascending',
    search: '',
    tag: '',
  },
  focus: {
    today: Array,
    tmr: Array,
    past: Array,
    impt: Array,
  },
  focusCategory: {
    today: true,
    tmr: true,
    past: true,
    impt: true,
  },
  tags: [],
};

function rootReducer(state = initialState, action: { type: string, payload?: any }) {
  switch (action.type) {
    case LOAD_TAGS_BEGIN:
      return {
        ...state,
        tagsLoading: true,
      };
    case LOAD_TAGS_SUCCESS:
      return {
        ...state,
        tagsLoading: false,
        tags: action.payload.tagList,
      };
    case LOAD_TAGS_FAIL:
      return {
        ...state,
        tagsLoading: false,
        message: 'Failed to load tags',
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        focusCategory: {
          today: action.payload.today !== undefined
            ? action.payload.today
            : state.focusCategory.today,
          tmr: action.payload.tmr !== undefined
            ? action.payload.tmr
            : state.focusCategory.tmr,
          past: action.payload.past !== undefined
            ? action.payload.past
            : state.focusCategory.past,
          impt: action.payload.impt !== undefined
            ? action.payload.impt
            : state.focusCategory.impt,
        },
      };
    case LOAD_FOCUS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOAD_FOCUS_SUCCESS:
      return {
        ...state,
        focus: {
          today: action.payload.today,
          tmr: action.payload.tmr,
          past: action.payload.past,
          impt: action.payload.impt,
        },
        loading: false,
      };
    case LOAD_FOCUS_FAIL:
      return {
        ...state,
        laoding: false,
        message: 'Failed to load data',
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        loading: true,
        sort: {
          ...state.sort,
          search: action.payload.search,
        },
      };
    case UPDATE_SORT:
      return {
        ...state,
        loading: true,
        sort: {
          ...state.sort,
          heading: action.payload.heading,
          direction: action.payload.direction,
        },
      };
    case UPDATE_TAG:
      return {
        ...state,
        loading: true,
        sort: {
          ...state.sort,
          tag: action.payload.tag,
        },
      };
    case WIPE_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case UPDATE_NAV:
      return {
        ...state,
        navRoute: action.payload.title,
        loading: action.payload.loading ? action.payload.loading : state.loading,
      };
    case LOAD_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case LOAD_DATA_FAIL:
      return {
        ...state,
        loading: false,
        message: 'Failed to load data',
      };
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        message: 'New todo has been added!',
      };
    case CREATE_TODO_FAIL:
      return {
        ...state,
        message: 'Failed to create a todo',
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        message: 'Todo has been updated',
      };
    case UPDATE_TODO_FAIL:
      return {
        ...state,
        message: 'Failed to update a todo',
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        message: 'Todo has been deleted',
      };
    case DELETE_TODO_FAIL:
      return {
        ...state,
        message: 'Failed to delete a todo',
      };
    default:
      return state;
  }
}

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(modifyTagsJsonInput, thunk));
  return store;
}
