import * as React from 'react';
import { Item } from 'semantic-ui-react';

import EachItem from './EachItem';
import { TodoObject } from '../../TypeDeclarations';

const ItemSegment = ({ data, visible }: { data: TodoObject[], visible: Boolean}) => {
  if (visible) {
    return (
      <Item.Group divided>
        <EachItem data={data} />
      </Item.Group>
    );
  }
  return (
    <div />
  );
};

export default ItemSegment;
