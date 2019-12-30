import React from 'react';
import { Menu, Input, Button } from 'semantic-ui-react';


const SearchBar = ({
  handleSearchChange, handleKeyDown, handleReset, search,
}) => (
  <Menu.Menu position="right">
    <Menu.Item>
      <Input
        className="icon"
        icon="search"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleReset}>Reset</Button>
    </Menu.Item>
  </Menu.Menu>
);

export default SearchBar;
