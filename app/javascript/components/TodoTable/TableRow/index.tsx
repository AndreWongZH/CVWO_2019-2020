import * as React from 'react';
import {
  Header, Table, Icon, Button,
} from 'semantic-ui-react';

import { capitalize, styleDate } from '../../../Functions';

import { TodoObjectType, OnClickEventType } from '../../TypeDeclarations';

import LabelCell from './LabelCell';

type TableRowProps = {
  data: TodoObjectType[],
  handleDelete: (e: OnClickEventType) => void,
  handleEdit: (e: OnClickEventType) => void,
}

const TableRow = ({ data, handleDelete, handleEdit }: TableRowProps) => {
  const tablerows = data.map((todo) => (
    <Table.Row key={todo.id}>
      <Table.Cell>
        <Header as="h4">{ capitalize(todo.title) }</Header>
      </Table.Cell>
      <Table.Cell singleLine>{ styleDate(todo.created) }</Table.Cell>
      <Table.Cell singleLine>{ styleDate(todo.deadline) }</Table.Cell>
      <Table.Cell>{ capitalize(todo.describe as string) }</Table.Cell>
      <Table.Cell>
        <LabelCell data={todo.tag} />
      </Table.Cell>
      <Table.Cell>
        <Button icon onClick={handleDelete} id={todo.id}>
          <Icon name="close" color="red" />
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button icon onClick={handleEdit} id={todo.id}>
          <Icon name="pencil alternate" />
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      {tablerows}
    </>
  );
};

export default TableRow;
