import React from 'react';
import { Item } from 'semantic-ui-react';

import EachItem from './EachItem';

const ItemSegment = ({ data, visible }) => {
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
