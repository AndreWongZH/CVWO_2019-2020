import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

import TagItem from './TagItem';

const DropdownTag = ({ data, handleTag }) => {
  return (
    <Dropdown
      text="Filter"
      icon="filter"
      floating
      labeled
      button
      className="icon"
    >
      <Dropdown.Menu>
        <Dropdown.Header icon="tags" content="Filter by tag" />
        <Dropdown.Divider />
        <TagItem data={data} handleTag={handleTag} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownTag;
