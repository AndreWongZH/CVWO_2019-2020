import * as React from 'react';
import {
  Header, Table, Segment, Dimmer, Loader, Message,
} from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';

import {
  loadData, wipeMessage, deleteTodo, updateNav, updateTable, loadTags,
} from '../store/actions';

import TableRow from './TableRow';
import DropdownTag from './DropdownTag';

import { ReduxStateType, UpdateTableValuesType, OnClickEventType } from '../TypeDeclarations';
import {
  DeleteTodoType, LoadDataType, WipeMessageType, UpdateNavType, UpdateTableType, LoadTagsType,
} from '../store/actions/ActionDeclaration';


const ApplyMagin = styled.div`
  margin-top: 1em;
`;

const StyledMessage = styled(Message)`
  &&& {
    margin-top: 1em;
  }
`;

type TodoTableProps = {
  loadData: LoadDataType,
  wipeMessage: WipeMessageType,
  deleteTodo: DeleteTodoType,
  updateNav: UpdateNavType,
  updateTable: UpdateTableType,
  loadTags: LoadTagsType,
}

type TodoTableState = {
  id: string,
  redirect: Boolean
}


class TodoTable extends React.Component<TodoTableProps & ReduxStateType, TodoTableState> {
  constructor(props: TodoTableProps & ReduxStateType) {
    super(props);
    this.state = {
      id: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const { loadData, loadTags } = this.props;
    loadData();
    loadTags();
  }

  handleMessage = (e: OnClickEventType) => {
    const { wipeMessage } = this.props;
    e.preventDefault();
    wipeMessage();
  }

  handleDelete = (e: OnClickEventType) => {
    const { deleteTodo } = this.props;
    e.preventDefault();
    const { id } = e.currentTarget;

    deleteTodo(id);
  }

  handleEdit = (e: OnClickEventType) => {
    const { updateNav } = this.props;
    e.preventDefault();
    const { id } = e.currentTarget;

    this.setState({ id });
    updateNav({ title: '/edit' });
    this.setState({ redirect: true });
  }

  handleSort = (clickedColumn: string) => () => {
    const { updateTable, sort } = this.props;

    if (sort.heading !== clickedColumn) {
      updateTable({
        heading: clickedColumn,
        direction: 'ascending',
      });
    } else {
      updateTable({
        heading: sort.heading,
        direction: sort.direction === 'ascending' ? 'descending' : 'ascending',
      });
    }
  }

  handleTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { updateTable } = this.props;

    updateTable({
      tag: e.currentTarget.textContent,
    });
  }

  render() {
    const {
      todos, loading, message, sort, tags, tagsLoading,
    } = this.props;
    const { redirect, id } = this.state;

    const flashMessage = message === ''
      ? (<div />)
      : (
        <StyledMessage
          onDismiss={this.handleMessage}
          onClose={this.handleMessage}
        >
          <Header>{message}</Header>
        </StyledMessage>
      );

    if (loading || tagsLoading) {
      return (
        <div>
          <Dimmer inverted active>
            <Loader content="Loading" />
          </Dimmer>
        </div>
      );
    }
    return (
      <>
        {flashMessage}
        {redirect && <Redirect to={`/edit/${id}`} />}
        <ApplyMagin>
          <DropdownTag tagList={tags} handleTag={this.handleTag} />
        </ApplyMagin>
        <Segment raised>
          <Table padded sortable selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={sort.heading === 'title' ? sort.direction : null}
                  onClick={this.handleSort('title')}
                >
                    Title
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={sort.heading === 'created' ? sort.direction : null}
                  onClick={this.handleSort('created')}
                >
                    Created
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={sort.heading === 'deadline' ? sort.direction : null}
                  onClick={this.handleSort('deadline')}
                >
                    Deadline
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={sort.heading === 'describe' ? sort.direction : null}
                  onClick={this.handleSort('describe')}
                >
                    Description
                </Table.HeaderCell>
                <Table.HeaderCell>Tags</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <TableRow
                data={todos}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
              />
            </Table.Body>
          </Table>
        </Segment>
      </>
    );
  }
}

const matchStateToProps = (state: ReduxStateType) => {
  return {
    todos: state.todos,
    loading: state.loading,
    tagsLoading: state.tagsLoading,
    message: state.message,
    sort: state.sort,
    tags: state.tags,
  };
};

const matchDispatchToProps = (dispatch: Function) => ({
  loadData: () => dispatch(loadData()),
  wipeMessage: () => dispatch(wipeMessage()),
  deleteTodo: (id: string) => dispatch(deleteTodo(id)),
  updateNav: ({
    title, loading,
  }: { title: string, loading?: Boolean }) => dispatch(updateNav({ title, loading })),
  updateTable: (values: UpdateTableValuesType) => dispatch(updateTable(values)),
  loadTags: () => dispatch(loadTags()),
});

export default connect(matchStateToProps, matchDispatchToProps)(TodoTable);
