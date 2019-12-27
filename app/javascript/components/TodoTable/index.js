import React from 'react'
import { Header, Table, Rating, Segment } from 'semantic-ui-react'

const TodoTable = () => (
    <Segment raised>
        <Table padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Tags</Table.HeaderCell>
                    <Table.HeaderCell>Summary</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4'>
                            Buy Groceries
                        </Header>
                    </Table.Cell>
                    <Table.Cell singleLine>
                        13 Dec 2019
                    </Table.Cell>
                    <Table.Cell>
                        Food, Weekly, Important
                    </Table.Cell>
                    <Table.Cell>
                        Get 3 eggs, 4 milk and 13 chips
                    </Table.Cell>
                </Table.Row>

            </Table.Body>
        </Table>
    </Segment>
)

export default TodoTable