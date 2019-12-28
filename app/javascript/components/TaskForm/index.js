import React, { Component } from 'react'
import { Grid, Header, Icon, Dimmer, Loader } from 'semantic-ui-react'

import axios from 'axios'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { createTodo, updateNav, updateTodo } from '../store/actions'

import FormInput from '../FormInput'

import { formatDate } from '../../Functions'

class TaskForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      deadline: '',
      desc: '',
      tag: '',
      redirect: false,
      type: '',
      loading: true
    }
  }

  async componentDidMount() {
    if (this.props.match.params.id){
      this.setState({ type: 'update' })
      const id = this.props.match.params.id
      axios
        .get(`/todos/${id}`)
        .then((res) => {
          this.setState({
            title: res.data['title'],
            deadline: res.data['deadline'],
            desc: res.data['desc'],
            tag: res.data['tag']
          })
        })
        .catch((err) => {
          console.log(err)
        })
        this.setState({ loading: false })
    } else {
      this.setState({ type: 'add', loading: false })
    }
  }

  onTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  onDeadlineChange = (e) => {
    this.setState({ deadline: e.target.value })
  }

  onDescChange = (e) => {
    this.setState({ desc: e.target.value })
  }

  onTagChange = (e) => {
    this.setState({ tag: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { type, title, deadline, desc, tag } = this.state
    const { createTodo, updateNav, updateTodo } = this.props

    const created = new Date(Date.now())
    const data = {
      title,
      created: formatDate(created),
      deadline,
      desc,
      done: false,
      tag
    }

    if (type === 'add') {
      createTodo(data)
    } else {
      data['id'] = this.props.match.params.id
      updateTodo(data)
    }
    
    updateNav('/')
    this.setState({ redirect: true })
  }

  render() {
    const { loading, redirect, type, title, deadline, desc, tag } = this.state

    if (loading) {
      return (
        <div>
            <Dimmer inverted active>
                <Loader content='Loading' />
            </Dimmer>
        </div>
      )
    } else {
      return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column  textAlign="left" style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Icon name='clipboard' /> 
              { type === 'add' ? 'Add your new task here' : 'Update task here' }
            </Header>
            <FormInput
              onTitleChange={this.onTitleChange}
              onDeadlineChange={this.onDeadlineChange}
              onDescChange={this.onDescChange}
              onTagChange={this.onTagChange}
              onSubmit={this.onSubmit}
              type={type}
              title= {title}
              deadline={deadline}
              desc={desc}
              tag={tag}
            />
          </Grid.Column>
          {redirect && <Redirect to='/' />}
        </Grid>
      )
    }
  }
}

const matchStateToProps = (state) => {
  return {
  }
}

const matchDispatchToProps = (dispatch) => ({
  createTodo: (info) => dispatch(createTodo(info)),
  updateTodo: (info) => dispatch(updateTodo(info)),
  updateNav: (payload) => dispatch(updateNav(payload))
})

export default connect(matchStateToProps, matchDispatchToProps)(TaskForm)