import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

import TagItem from './TagItem';

import { ReduxStateType, OnTagSelectType } from '../../TypeDeclarations';


type DropdownTagType = {
  tagList: ReduxStateType['tags'],
  handleTag: OnTagSelectType
}


const DropdownTag = ({ tagList, handleTag }: DropdownTagType) => {
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
        <TagItem tagList={tagList} handleTag={handleTag} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownTag;
