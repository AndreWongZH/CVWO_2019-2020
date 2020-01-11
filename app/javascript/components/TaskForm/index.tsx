import * as React from 'react';
import {
  Grid, Header, Icon, Dimmer, Loader, TextAreaProps,
} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import FormInput from './FormInput';
import { formatDate } from '../../Functions';
import {
  createTodo, updateNav, updateTodo, loadTags, loadTagsFail,
} from '../store/actions';

import {
  OnChangeEventType, TodoObjectType, OnChangeTextAreaEventType, OnClickEventType, ReduxStateType,
} from '../TypeDeclarations';
import {
  CreateTodoType, UpdateNavType, UpdateTodoType, LoadTagsType,
} from '../store/actions/ActionDeclaration';


type TaskFormProps = {
  createTodo: CreateTodoType,
  updateNav: UpdateNavType,
  updateTodo: UpdateTodoType,
  loadTags: LoadTagsType,
  loadTagsFail: LoadTagsType,
  tagsLoading: Boolean
  tags: { text: string, value: string }[]
}

type TaskFormState = {
  title: string,
  deadline: string,
  describe: string | number,
  created: string,
  done: Boolean,
  redirect: Boolean,
  type: string,
  loading: Boolean,
  currentTags: string[],
  missingTitle: Boolean,
}


class TaskForm extends React.Component<
TaskFormProps & RouteComponentProps<{ id: string }>, TaskFormState> {
  constructor(props: TaskFormProps & RouteComponentProps<{ id: string }>) {
    super(props);
    this.state = {
      title: '',
      deadline: '',
      created: '',
      describe: '',
      done: false,
      redirect: false,
      type: '',
      loading: true,
      currentTags: [],
      missingTitle: false,
    };
  }

  async componentDidMount() {
    const { match, loadTags, loadTagsFail } = this.props;
    loadTags();

    if (match.params.id) {
      this.setState({ type: 'update' });
      const { id } = match.params;
      axios
        .get(`/todos/${id}`)
        .then((res) => {
          this.setState({
            title: res.data.title,
            created: res.data.created,
            deadline: res.data.deadline,
            describe: res.data.describe,
            done: res.data.done,
            currentTags: res.data.tag.split(','),
          });
        })
        .catch(() => {
          loadTagsFail();
        });
    } else {
      this.setState({ type: 'add' });
    }
    this.setState({ loading: false });
  }

  onTitleChange = (e: OnChangeEventType) => {
    this.setState({ title: e.target.value });
  }

  onDeadlineChange = (e: OnChangeEventType) => {
    this.setState({ deadline: e.target.value });
  }

  onDescChange = (e: OnChangeTextAreaEventType, data: TextAreaProps) => {
    this.setState({ describe: data.value });
  }

  onTagChange = (e: OnChangeEventType, { value }: { value: string[] }) => {
    this.setState({ currentTags: value });
  }

  onSubmit = (e: OnClickEventType) => {
    e.preventDefault();
    const {
      type, title, deadline, describe, currentTags, created, done,
    } = this.state;
    const {
      createTodo, updateNav, updateTodo, match,
    } = this.props;

    if (title === '') {
      this.setState({ missingTitle: true });
      return;
    }

    const data: TodoObjectType = {
      title,
      created,
      deadline,
      describe,
      done,
      tag: currentTags.join(),
    };

    if (type === 'add') {
      const DateNow = new Date(Date.now());
      data.created = formatDate(DateNow);
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
      loading, redirect, type, title, deadline, describe, currentTags, missingTitle,
    } = this.state;

    const { tagsLoading, tags } = this.props;

    if (tagsLoading || loading) {
      return (
        <div>
          <Dimmer inverted active>
            <Loader content="Loading" />
          </Dimmer>
        </div>
      );
    }
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <Header id="addHead" as="h2" textAlign="center">
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
            describe={describe}
            tagList={tags}
            currentTags={currentTags}
            missingTitle={missingTitle}
          />
        </Grid.Column>
        {redirect && <Redirect to="/" />}
      </Grid>
    );
  }
}

const matchStateToProps = (state: ReduxStateType) => {
  return {
    tagsLoading: state.tagsLoading,
    tags: state.tags,
  };
};

const matchDispatchToProps = (dispatch: Function) => ({
  createTodo: (info: TodoObjectType) => dispatch(createTodo(info)),
  updateTodo: (info: TodoObjectType) => dispatch(updateTodo(info)),
  updateNav: ({
    title, loading,
  }: { title: string, loading?: Boolean }) => dispatch(updateNav({ title, loading })),
  loadTags: () => dispatch(loadTags()),
  loadTagsFail: () => dispatch(loadTagsFail()),
});

export default connect(matchStateToProps, matchDispatchToProps)(TaskForm);
