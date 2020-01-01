import * as React from 'react';
import { Item } from 'semantic-ui-react';

import EachItem from './EachItem';
import { TodoObjectType } from '../../TypeDeclarations';

const ItemSegment = ({ data, visible }: { data: TodoObjectType[], visible: Boolean}) => {
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
