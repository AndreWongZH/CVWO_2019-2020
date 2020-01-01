import * as React from 'react';

export type TodoObject = {
    id?: string,
    title: string,
    created: string,
    deadline: string,
    desc: string | number,
    done: Boolean
    tag: string
}

export type ReduxState = {
    todos: TodoObject[],
    loading: Boolean,
    navRoute: string,
    message: string,
    sort: {
      heading: string,
      direction: 'ascending' | 'descending',
      search: string,
    },
    focus: {
      today: TodoObject[],
      tmr: TodoObject[],
      past: TodoObject[],
      impt: TodoObject[],
    },
    focusCategory: {
      today: Boolean,
      tmr: Boolean,
      past: Boolean,
      impt: Boolean,
    },
}

// for event props
export type OnChangeEvent = React.ChangeEvent<HTMLInputElement>

export type OnChangeTextAreaEvent = React.FormEvent<HTMLTextAreaElement>

export type OnClickEvent = React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>

export type UpdateTableValues = {
  heading?: string,
  direction?: string,
  search?: string,
}

export type UpdateCategoryData = {
  today?: Boolean,
  past?: Boolean,
  tmr?: Boolean,
  impt?: Boolean
}