import * as React from 'react';
import {
  Header, Table, Segment, Dimmer, Loader, Message, Container,
} from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import {
  loadData, wipeMessage, deleteTodo, updateNav, updateTable,
} from '../store/actions';

import TableRow from './TableRow';
import { ReduxState, UpdateTableValues, OnClickEvent } from '../TypeDeclarations';
import { DeleteTodo, LoadData, WipeMessage, UpdateNav, UpdateTable } from '../store/actions/ActionDeclaration';

type TodoTableProps = {
  loadData: LoadData,
  wipeMessage: WipeMessage,
  deleteTodo: DeleteTodo,
  updateNav: UpdateNav,
  updateTable: UpdateTable,
}

type TodoTableState = {
  id: string,
  redirect: Boolean
}


class TodoTable extends React.Component<TodoTableProps & ReduxState, TodoTableState>{
  constructor(props: TodoTableProps & ReduxState) {
    super(props);
    this.state = {
      id: '',
      redirect: false,
    };
  }

  async componentDidMount() {
    const { loadData } = this.props;
    await loadData();
  }

  handleMessage = (e: OnClickEvent) => {
    const { wipeMessage } = this.props;
    e.preventDefault();
    wipeMessage();
  }

  handleDelete = async (e: OnClickEvent) => {
    const { deleteTodo, loadData } = this.props;
    e.preventDefault();
    const { id } = e.currentTarget;

    await deleteTodo(id);
    await loadData();
  }

  handleEdit = (e: OnClickEvent) => {
    const { updateNav } = this.props;
    e.preventDefault();
    const { id } = e.currentTarget;

    this.setState({ id });
    updateNav({ title: '/edit'});
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

  render() {
    const {
      todos, loading, message, sort,
    } = this.props;
    const { redirect, id } = this.state;

    const flashMessage = message === ''
      ? (<div></div>)
      : (
        <Message
          onDismiss={this.handleMessage}
          onClose={this.handleMessage}
        >
          <Header>{message}</Header>
        </Message>
      );

    if (loading) {
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
        <Container>
          {flashMessage}
          {redirect && <Redirect to={`/edit/${id}`} />}
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
                    sorted={sort.heading === 'desc' ? sort.direction : null}
                    onClick={this.handleSort('desc')}
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
        </Container>
      </>
    );
  }
}

const matchStateToProps = (state: ReduxState) => {
  return {
    todos: state.todos,
    loading: state.loading,
    message: state.message,
    sort: state.sort,
  };
};

const matchDispatchToProps = (dispatch: Function ) => ({
  loadData: () => dispatch(loadData()),
  wipeMessage: () => dispatch(wipeMessage()),
  deleteTodo: (id: string) => dispatch(deleteTodo(id)),
  updateNav: ({ title, loading }: { title: string, loading?: Boolean }) => dispatch(updateNav({ title, loading })),
  updateTable: (values: UpdateTableValues) => dispatch(updateTable(values)),
});

export default connect(matchStateToProps, matchDispatchToProps)(TodoTable);
