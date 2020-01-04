import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { OnChangeEventType } from '../../../TypeDeclarations';


type TagInputProps = {
  tagList: { text: string, value: string }[],
  currentTags: string[],
  onTagChange: (e: OnChangeEventType, { value }: { value: string[] }) => void,
}

type TagInputState = {
  options: { text: string, value: string }[]
}

class TagInput extends React.Component<TagInputProps, TagInputState> {
  constructor(props: TagInputProps) {
    super(props);
    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    const { tagList } = this.props;
    this.setState({ options: tagList });
  }

  handleAddition = (e: React.KeyboardEvent, { value }: { value: string }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }));
  }

  render() {
    const { options } = this.state;
    const { currentTags, onTagChange } = this.props;

    return (
      <Dropdown
        options={options}
        placeholder="Choose Tags"
        search
        selection
        fluid
        multiple
        allowAdditions
        value={currentTags}
        onAddItem={this.handleAddition}
        onChange={onTagChange}
      />
    );
  }
}

export default TagInput;
