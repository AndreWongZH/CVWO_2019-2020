import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { ReduxStateType, OnTagSelectType } from '../../../TypeDeclarations';


type TagItemType = {
  tagList: ReduxStateType['tags'],
  handleTag: OnTagSelectType
}


const TagItem = ({ tagList, handleTag }: TagItemType) => {
  const EachItem = tagList.map((tag) => (
    <Dropdown.Item
      key={tag.value}
      onClick={handleTag}
    >
      {tag.value}
    </Dropdown.Item>
  ));

  return (
    <>
      <Dropdown.Item
        key="reset"
        icon="repeat"
        text="Reset Tags"
        onClick={handleTag}
      />
      {EachItem}
    </>
  );
};

export default TagItem;
