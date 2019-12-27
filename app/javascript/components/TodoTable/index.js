import React, { Component } from 'react'
import { Table, Segment } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadData } from '../store/actions'

import TableRow from '../TableRow'


class TodoTable extends Component {
    constructor() {
        super();
        
    }

    async componentDidMount() {
        const { loadData } = this.props;
        await loadData()
    }

    render() {
        const { todos, loading } = this.props

        if (loading) {
            return <div>I am LOADING</div>
        } else {
            console.log(todos)
            return (
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
            )
        }
    }
}

const matchStateToProps = (state) => {
    return {
        todos: state.todos,
        loading: state.loading
    }
}

const matchDispatchToProps = (dispatch) => ({
    loadData: (payload) => dispatch(loadData(payload))
})



export default connect(matchStateToProps, matchDispatchToProps)(TodoTable);