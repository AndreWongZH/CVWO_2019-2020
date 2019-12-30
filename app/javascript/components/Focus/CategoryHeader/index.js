import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

const CategoryHeader = ({
  type, hide, iconName, headingName, focusCategory,
}) => (
  <Segment.Inline>
    <Header as="h3" floated="left">
      <Icon name={iconName} />
      <Header.Content>{headingName}</Header.Content>

    </Header>
    <Header floated="right">
      <Icon link onClick={hide(type)} name={focusCategory ? 'caret up' : 'caret down'} />
    </Header>
  </Segment.Inline>
);

export default CategoryHeader;
