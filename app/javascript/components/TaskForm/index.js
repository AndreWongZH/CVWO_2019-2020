import React, { Component } from 'react'
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { createTodo } from '../store/actions'

import { formatDate } from '../../Functions'

class TaskForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      deadline: '',
      desc: '',
      tag: '',
      redirect: false
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
    const { title, deadline, desc, tag } = this.state
    const { createTodo, updateNav } = this.props

    const created = new Date(Date.now())
    const data = {
      title,
      created: formatDate(created),
      deadline,
      desc,
      done: false,
      tag
    }

    createTodo(data)
    updateNav('/')
    this.setState({ redirect: true })
  }

  render() {
    const { redirect } = this.state

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column  textAlign="left" style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Icon name='clipboard' /> Add your new task here
          </Header>
          <Form size='large'>
            <Segment stacked>
                <Form.Field>
                    <label>Title</label>
                    <Form.Input
                      fluid
                      icon='pencil alternate'
                      iconPosition='left'
                      placeholder='title'
                      onChange={this.onTitleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Deadline</label>
                    <Form.Input
                      fluid
                      icon='clock'
                      iconPosition='left'
                      type='date'
                      onChange={this.onDeadlineChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Description</label>
                    <Form.TextArea
                      placeholder='Enter description...'
                      style={{ minHeight: 140}}
                      onChange={this.onDescChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Tags</label>
                    <Form.Input
                      fluid
                      icon='paperclip'
                      iconPosition='left'
                      placeholder='tags'
                      onChange={this.onTagChange}
                    />
                </Form.Field>

                <Button color='teal' fluid size='large' onClick={this.onSubmit}>
                    Submit
                </Button>
            </Segment>
          </Form>
        </Grid.Column>
        {redirect && <Redirect to='/' />}
      </Grid>
    )
  }
}

const matchStateToProps = (state) => {
  return {
      
  }
}

const matchDispatchToProps = (dispatch) => ({
  createTodo: (info) => dispatch(createTodo(info)),
  updateNav:(payload) => dispatch(updateNav(payload))
})

export default connect(matchStateToProps, matchDispatchToProps)(TaskForm)