import * as React from 'react';
import {
  Header, Table, Icon, Button,
} from 'semantic-ui-react';

import LabelCell from './LabelCell';
import { capitalize, styleDate } from '../../../Functions';

import { TodoObjectType, OnClickEventType } from '../../TypeDeclarations';


type TableRowProps = {
  data: TodoObjectType[],
  handleDelete: (e: OnClickEventType) => void,
  handleEdit: (e: OnClickEventType) => void,
}


const TableRow = ({ data, handleDelete, handleEdit }: TableRowProps) => {
  const tablerows = data.map((todo) => (
    <Table.Row
      key={todo.id}
      className="tablerows"
    >
      <Table.Cell>
        <Header as="h4">{ capitalize(todo.title) }</Header>
      </Table.Cell>

      <Table.Cell singleLine>{ styleDate(todo.created) }</Table.Cell>

      <Table.Cell singleLine>{ todo.deadline !== null ? styleDate(todo.deadline) : 'Update deadline' }</Table.Cell>

      <Table.Cell>{ todo.describe !== '' ? capitalize(todo.describe as string) : null }</Table.Cell>

      <Table.Cell>
        {
          todo.tag !== '' ? <LabelCell data={todo.tag} /> : null
        }
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
