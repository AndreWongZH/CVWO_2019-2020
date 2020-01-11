import * as React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
// SemanticICONS is excluded from no-unused-vars rule
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';


type CategoryHeaderProps = {
  type: string,
  hide: (category: string) => void,
  iconName: SemanticICONS,
  headingName: string,
  focusCategory: Boolean
}


const CategoryHeader = ({
  type, hide, iconName, headingName, focusCategory,
}: CategoryHeaderProps) => (
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
