import React, { Component } from 'react'
import { Header, Table, Segment, Dimmer, Loader, Message } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadData, wipeMessage } from '../store/actions'

import TableRow from '../TableRow'


class TodoTable extends Component {
    constructor() {
        super();
        
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

    render() {
        const { todos, loading, message } = this.props

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
                    <Segment raised>
                        <Table padded selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Created</Table.HeaderCell>
                                    <Table.HeaderCell>Deadline</Table.HeaderCell>
                                    <Table.HeaderCell>Summary</Table.HeaderCell>
                                    <Table.HeaderCell>Tags</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <TableRow data={todos} />
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
    wipeMessage: () => dispatch(wipeMessage())
})



export default connect(matchStateToProps, matchDispatchToProps)(TodoTable);