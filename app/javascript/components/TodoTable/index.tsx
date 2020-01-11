import * as React from 'react';
import {
  Header, Table, Dimmer, Loader, Message, Segment,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import TableRow from './TableRow';
import DropdownTag from './DropdownTag';
import {
  loadData, wipeMessage, deleteTodo, updateNav, updateTable, loadTags,
} from '../store/actions';

import { ReduxStateType, UpdateTableValuesType, OnClickEventType } from '../TypeDeclarations';
import {
  DeleteTodoType, LoadDataType, WipeMessageType, UpdateNavType, UpdateTableType, LoadTagsType,
} from '../store/actions/ActionDeclaration';


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
        <Message
          id="message"
          onDismiss={this.handleMessage}
          onClose={this.handleMessage}
        >
          <Header>{message}</Header>
        </Message>
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
        <DropdownTag tagList={tags} handleTag={this.handleTag} />
        <Segment raised style={{ backgroundColor: '#D8C3A5' }}>
          <Table padded sortable selectable style={{ backgroundColor: '#9C9992' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={sort.heading === 'title' ? sort.direction : null}
                  onClick={this.handleSort('title')}
                  style={sort.heading === 'title' ? { backgroundColor: '#E98074' } : { backgroundColor: '#9C9992' }}
                >
                    Title
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={sort.heading === 'created' ? sort.direction : null}
                  onClick={this.handleSort('created')}
                  style={sort.heading === 'created' ? { backgroundColor: '#E98074' } : { backgroundColor: '#9C9992' }}
                >
                    Created
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={sort.heading === 'deadline' ? sort.direction : null}
                  onClick={this.handleSort('deadline')}
                  style={sort.heading === 'deadline' ? { backgroundColor: '#E98074' } : { backgroundColor: '#9C9992' }}
                >
                    Deadline
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={sort.heading === 'describe' ? sort.direction : null}
                  onClick={this.handleSort('describe')}
                  style={sort.heading === 'describe' ? { backgroundColor: '#E98074' } : { backgroundColor: '#9C9992' }}
                >
                    Description
                </Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor: '#9C9992' }}>Tags</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor: '#9C9992' }}>Delete</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor: '#9C9992' }}>Edit</Table.HeaderCell>
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
