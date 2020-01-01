import * as React from 'react';
import { Item } from 'semantic-ui-react';

import LabelCell from '../../../TodoTable/TableRow/LabelCell';
import { TodoObject } from '../../../TypeDeclarations';

const EachItem = ({ data }: { data: TodoObject[]}) => {
  const ItemCombined = data.map((todo: TodoObject) => (
    <Item key={todo.id}>
      <Item.Content>
        <Item.Header>{ todo.title }</Item.Header>
        <Item.Meta>
          <span>
            Created on:
            {todo.created}
          </span>
        </Item.Meta>
        <Item.Description>{todo.desc}</Item.Description>
        <Item.Extra>
          <LabelCell data={todo.tag} />
        </Item.Extra>
      </Item.Content>
    </Item>
  ));

  return (
    <React.Fragment>
      {ItemCombined}
    </React.Fragment>
  );
};

export default EachItem;
