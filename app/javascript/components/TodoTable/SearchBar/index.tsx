import * as React from 'react';
import { Input, Button } from 'semantic-ui-react';

import { OnChangeEventType } from '../../TypeDeclarations';


type SearchBarProps = {
  handleSearchChange: (e: OnChangeEventType) => void,
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void,
  handleReset: () => void,
  search: string
}


const SearchBar = ({
  handleSearchChange, handleKeyDown, handleReset, search,
}: SearchBarProps) => (
  <div style={{ marginTop: '1em' }}>
    <Input
      id="searchbar"
      className="icon"
      icon="search"
      placeholder="Search..."
      value={search}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
    />
    <Button onClick={handleReset}>Reset</Button>
  </div>
);

export default SearchBar;
