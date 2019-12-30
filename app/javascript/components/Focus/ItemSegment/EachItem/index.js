import React from 'react';
import { Item } from 'semantic-ui-react';

import LabelCell from '../../../TodoTable/TableRow/LabelCell';

const EachItem = ({ data }) => {
  const ItemCombined = data.map((todo) => (
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

  return ItemCombined;
};

export default EachItem;
