import * as React from 'react';
import { Item } from 'semantic-ui-react';

import { capitalize, styleDate } from '../../../../Functions';

import LabelCell from '../../../TodoTable/TableRow/LabelCell';
import { TodoObjectType } from '../../../TypeDeclarations';

const EachItem = ({ data }: { data: TodoObjectType[]}) => {
  const ItemCombined = data.map((todo: TodoObjectType) => (
    <Item key={todo.id}>
      <Item.Content>
        <Item.Header>{ capitalize(todo.title) }</Item.Header>
        <Item.Meta>
          <span>
            Created on :
            {styleDate(todo.created)}
          </span>
          {
            todo.deadline !== null
              ? (
                <>
                  <br />
                  <span>
                    Deadline by :
                    {styleDate(todo.deadline)}
                  </span>
                </>
              ) : null
          }
        </Item.Meta>
        <Item.Description>{todo.describe}</Item.Description>
        <Item.Extra>
          {
            todo.tag !== '' ? <LabelCell data={todo.tag} /> : null
          }
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
