import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

const TagItem = ({ data, handleTag }) => {
  const EachItem = data.map((tag) => (
    <Dropdown.Item
      key={tag}
      onClick={handleTag}
    >
      {tag}
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
