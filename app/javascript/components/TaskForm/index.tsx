import * as React from 'react';
import {
  Grid, Header, Icon, Dimmer, Loader, Container, TextAreaProps,
} from 'semantic-ui-react';

import axios from 'axios';

import { Redirect, RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';
import { createTodo, updateNav, updateTodo } from '../store/actions';

import FormInput from './FormInput';

import { formatDate } from '../../Functions';

import { OnChangeEvent, ReduxState, TodoObject, OnChangeTextAreaEvent, OnClickEvent } from '../TypeDeclarations'
import { CreateTodo, UpdateNav, UpdateTodo } from '../store/actions/ActionDeclaration';

type TaskFormProps = {
  createTodo: CreateTodo,
  updateNav: UpdateNav,
  updateTodo: UpdateTodo,
}

type TaskFormState = {
  title: string,
  deadline: string,
  desc: string | number,
  tag: string,
  redirect: Boolean,
  type: string,
  loading: Boolean,
}


class TaskForm extends React.Component<TaskFormProps & RouteComponentProps<{ id: string }>, TaskFormState> {
  constructor(props: TaskFormProps & RouteComponentProps<{ id: string }>) {
    super(props);
    this.state = {
      title: '',
      deadline: '',
      desc: '',
      tag: '',
      redirect: false,
      type: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
      this.setState({ type: 'update' });
      const { id } = match.params;
      axios
        .get(`/todos/${id}`)
        .then((res) => {
          this.setState({
            title: res.data.title,
            deadline: res.data.deadline,
            desc: res.data.desc,
            tag: res.data.tag,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ loading: false });
    } else {
      this.setState({ type: 'add', loading: false });
    }
  }

  onTitleChange = (e: OnChangeEvent) => {
    this.setState({ title: e.target.value });
  }

  onDeadlineChange = (e: OnChangeEvent) => {
    this.setState({ deadline: e.target.value });
  }

  onDescChange = (e: OnChangeTextAreaEvent, data: TextAreaProps) => {
    this.setState({ desc: data.value });
  }

  onTagChange = (e: OnChangeEvent) => {
    this.setState({ tag: e.target.value });
  }

  onSubmit = (e: OnClickEvent) => {
    e.preventDefault();
    const {
      type, title, deadline, desc, tag,
    } = this.state;
    const {
      createTodo, updateNav, updateTodo, match,
    } = this.props;

    const created = new Date(Date.now());
    const data: TodoObject = {
      title,
      created: formatDate(created),
      deadline,
      desc,
      done: false,
      tag,
    };

    if (type === 'add') {
      createTodo(data);
    } else {
      data.id = match.params.id;
      updateTodo(data);
    }

    updateNav({ title: '/' });
    this.setState({ redirect: true });
  }

  render() {
    const {
      loading, redirect, type, title, deadline, desc, tag,
    } = this.state;

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
          <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
            <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                <Icon name="clipboard" />
                { type === 'add' ? 'Add your new task here' : 'Update task here' }
              </Header>
              <FormInput
                onTitleChange={this.onTitleChange}
                onDeadlineChange={this.onDeadlineChange}
                onDescChange={this.onDescChange}
                onTagChange={this.onTagChange}
                onSubmit={this.onSubmit}
                type={type}
                title={title}
                deadline={deadline}
                desc={desc}
                tag={tag}
              />
            </Grid.Column>
            {redirect && <Redirect to="/" />}
          </Grid>
        </Container>
      </>
    );
  }
}

const matchStateToProps = (state: ReduxState) => {
  return {
  };
};

const matchDispatchToProps = (dispatch: Function) => ({
  createTodo: (info: TodoObject) => dispatch(createTodo(info)),
  updateTodo: (info: TodoObject) => dispatch(updateTodo(info)),
  updateNav: ({ title, loading }: { title: string, loading?: Boolean }) => dispatch(updateNav({ title, loading })),
});

export default connect(matchStateToProps, matchDispatchToProps)(TaskForm);
