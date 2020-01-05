import { DropdownItemProps } from 'semantic-ui-react';

export type TodoObjectType = {
    id?: string,
    title: string,
    created: string,
    deadline?: string,
    describe: string | number,
    done: Boolean
    tag: string
}

export type ReduxStateType = {
  todos: TodoObjectType[],
  loading: Boolean,
  tagsLoading: Boolean,
  navRoute: string,
  message: string,
  sort: {
    heading: string,
    direction: 'ascending' | 'descending',
    search: string,
    tag: string
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
  tags: { text: string, value: string }[],
}

// for event props
export type OnChangeEventType = React.ChangeEvent<HTMLInputElement>

export type OnChangeTextAreaEventType = React.FormEvent<HTMLTextAreaElement>

export type OnClickEventType = React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>

export type OnTagSelectType = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: DropdownItemProps
) => void

// for argument types in redux actions
export type UpdateTableValuesType = {
  heading?: string,
  direction?: string,
  search?: string,
  tag?: string
}

export type UpdateCategoryDataType = {
  today?: Boolean,
  past?: Boolean,
  tmr?: Boolean,
  impt?: Boolean
}
