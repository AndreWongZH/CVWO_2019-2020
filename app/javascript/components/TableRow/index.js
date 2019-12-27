import React from 'react';
import { Header, Table } from 'semantic-ui-react'

import LabelCell from '../LabelCell'

const TableRow = ({ data }) => {
    const tablerows = data.map((todo) => (
        <Table.Row key={todo.id} >
            <Table.Cell>
                <Header as='h4'>{todo.title}</Header>
            </Table.Cell>
            <Table.Cell singleLine>{todo.created}</Table.Cell>
            <Table.Cell singleLine>{todo.deadline}</Table.Cell>
            <Table.Cell>{todo.desc}</Table.Cell>
            <Table.Cell>
                <LabelCell data={todo.tag} />
            </Table.Cell>
        </Table.Row>
    ))
    return tablerows
}

export default TableRow