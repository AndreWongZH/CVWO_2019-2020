import { TodoObjectType, UpdateTableValuesType, UpdateCategoryDataType } from '../../TypeDeclarations';

export type DeleteTodoType = (id: string) => (dispatch: Function) => void

export type UpdateTodoType = ({
  id, title, created, deadline, describe, done, tag,
}: TodoObjectType) => (dispatch: Function) => void

export type CreateTodoType = ({
  id, title, created, deadline, describe, done, tag,
}: TodoObjectType) => (dispatch: Function) => void

export type UpdateTableType = (values: UpdateTableValuesType) => (dispatch: Function) => void

export type LoadDataType = () => (dispatch: Function, getState: Function) => void

export type UpdateNavType = ({ title, loading }: { title: string, loading?: Boolean }) => {
  type: string;
  payload: {
    title: string;
    loading: Boolean;
  };
}

export type WipeMessageType = () => {
  type: string
}

export type LoadFocusType = () => (dispatch: Function) => void

export type UpdateCategoryType = (data: UpdateCategoryDataType) => {
  type: string;
  payload: UpdateCategoryDataType;
}
