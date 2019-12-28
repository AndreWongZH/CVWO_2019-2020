import React, { Component } from 'react'
import { Header, Table, Segment, Dimmer, Loader, Message } from 'semantic-ui-react'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { loadData, wipeMessage, deleteTodo, updateNav } from '../store/actions'

import TableRow from './TableRow'


class TodoTable extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            redirect: false
        }
    }

    async componentDidMount() {
        const { loadData } = this.props;
        await loadData()
    }

    handleMessage = (e) => {
        const { wipeMessage } = this.props
        e.preventDefault()
        wipeMessage()
    }

    handleDelete = async (e) => {
        const { deleteTodo, loadData } = this.props
        e.preventDefault()
        const id = (e.currentTarget.id)

        await deleteTodo(id)
        await loadData()
    }

    handleEdit = (e) => {
        const { updateNav } = this.props
        e.preventDefault()
        const id = (e.currentTarget.id)

        this.setState({ id })
        updateNav('/add')
        this.setState({ redirect: true })
    }

    render() {
        const { todos, loading, message } = this.props
        const { redirect, id } = this.state

        const flashMessage =  message === ''
            ? (<div></div>)
            :   (<Message
                    onDismiss={this.handleMessage}
                    onClose={this.handleMessage}
                >
                    <Header>{message}</Header>
                </Message>)

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
                <React.Fragment>
                    {flashMessage}
                    {redirect && <Redirect to={`/edit/${id}`} />}
                    <Segment raised>
                        <Table padded selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Created</Table.HeaderCell>
                                    <Table.HeaderCell>Deadline</Table.HeaderCell>
                                    <Table.HeaderCell>Summary</Table.HeaderCell>
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
                </React.Fragment>
            )
        }
    }
}

const matchStateToProps = (state) => {
    return {
        todos: state.todos,
        loading: state.loading,
        message: state.message
    }
}

const matchDispatchToProps = (dispatch) => ({
    loadData: (payload) => dispatch(loadData(payload)),
    wipeMessage: () => dispatch(wipeMessage()),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    updateNav:(payload) => dispatch(updateNav(payload))
})



export default connect(matchStateToProps, matchDispatchToProps)(TodoTable);