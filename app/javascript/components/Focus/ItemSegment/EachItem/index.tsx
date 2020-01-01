import * as React from 'react';
import { Item } from 'semantic-ui-react';

import LabelCell from '../../../TodoTable/TableRow/LabelCell';
import { TodoObjectType } from '../../../TypeDeclarations';

const EachItem = ({ data }: { data: TodoObjectType[]}) => {
  const ItemCombined = data.map((todo: TodoObjectType) => (
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
    <>
      {ItemCombined}
    </>
  );
};

export default EachItem;
