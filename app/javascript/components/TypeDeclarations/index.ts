// import * as React from 'react';

export type TodoObjectType = {
    id?: string,
    title: string,
    created: string,
    deadline: string,
    desc: string | number,
    done: Boolean
    tag: string
}

export type ReduxStateType = {
    todos: TodoObjectType[],
    loading: Boolean,
    navRoute: string,
    message: string,
    sort: {
      heading: string,
      direction: 'ascending' | 'descending',
      search: string,
    },
    focus: {
      today: TodoObjectType[],
      tmr: TodoObjectType[],
      past: TodoObjectType[],
      impt: TodoObjectType[],
    },
    focusCategory: {
      today: Boolean,
      tmr: Boolean,
      past: Boolean,
      impt: Boolean,
    },
}

// for event props
export type OnChangeEventType = React.ChangeEvent<HTMLInputElement>

export type OnChangeTextAreaEventType = React.FormEvent<HTMLTextAreaElement>

export type OnClickEventType = React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>

export type UpdateTableValuesType = {
  heading?: string,
  direction?: string,
  search?: string,
}

export type UpdateCategoryDataType = {
  today?: Boolean,
  past?: Boolean,
  tmr?: Boolean,
  impt?: Boolean
}
