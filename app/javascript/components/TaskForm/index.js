import React from 'react'
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'

const TaskForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Icon name='clipboard' /> Add your new task here
      </Header> 
      <Form size='large'>
        <Segment stacked>
            <Form.Field>
                <label>Title</label>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='title' />
            </Form.Field>

            <Form.Field>
                <label>Date</label>
                <Form.Input fluid icon='user' iconPosition='left' type='date' />
            </Form.Field>

            <Form.Field>
                <label>Tags</label>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='tags' />
            </Form.Field>

            <Form.Field>
                <label>Description</label>
                <Form.TextArea placeholder='Enter description...' />
            </Form.Field>

            <Button color='teal' fluid size='large'>
                Submit
            </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)

export default TaskForm