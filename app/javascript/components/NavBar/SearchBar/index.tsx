import * as React from 'react';
import { Menu, Input, Button } from 'semantic-ui-react';

import { OnChangeEvent } from '../../TypeDeclarations'

type SearchBarProps = {
  handleSearchChange: (e: OnChangeEvent) => void,
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void,
  handleReset: () => void,
  search: string
}


const SearchBar = ({
  handleSearchChange, handleKeyDown, handleReset, search,
}: SearchBarProps) => (
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
