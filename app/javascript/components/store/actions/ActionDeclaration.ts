import { TodoObject, UpdateTableValues, UpdateCategoryData } from "../../TypeDeclarations"

export type DeleteTodo = (id: string) => (dispatch: Function) => void

export type UpdateTodo = ({
  id, title, created, deadline, desc, done, tag,
}: TodoObject) => (dispatch: Function) => void

export type CreateTodo = ({
  id, title, created, deadline, desc, done, tag,
}: TodoObject) => (dispatch: Function) => void

export type UpdateTable = (values: UpdateTableValues) => (dispatch: Function) => void

export type LoadData = () => (dispatch: Function, getState: Function) => void

export type UpdateNav = ({ title, loading }: { title: string, loading?: Boolean }) => {
  type: string;
  payload: {
    title: string;
    loading: Boolean;
  };
}

export type WipeMessage = () => {
  type: string
}

export type LoadFocus = () => (dispatch: Function) => void

export type UpdateCategory = (data: UpdateCategoryData) => {
  type: string;
  payload: UpdateCategoryData;
}