import * as React from 'react';

import {
  Form, Segment, Button, TextAreaProps,
} from 'semantic-ui-react';

import TagInput from './TagInput';

import { OnChangeEventType, OnChangeTextAreaEventType, OnClickEventType } from '../../TypeDeclarations';

type FormInputProps = {
  title: string,
  deadline: string,
  describe: string | number,
  type: string,
  tagList: { text: string, value: string }[],
  currentTags: string[],
  onTitleChange: (e: OnChangeEventType) => void,
  onDeadlineChange: (e: OnChangeEventType) => void,
  onDescChange: (e: OnChangeTextAreaEventType, data: TextAreaProps) => void,
  onTagChange: (e: OnChangeEventType, { value }: { value: string[] }) => void,
  onSubmit: (e: OnClickEventType) => void,
}

const FormInput = ({
  title,
  deadline,
  describe,
  type,
  onTitleChange,
  onDeadlineChange,
  onDescChange,
  onTagChange,
  onSubmit,
  tagList,
  currentTags,
}: FormInputProps) => {
  const FormTotal = (
    <Form size="large">
      <Segment stacked>
        <Form.Field>
          <label>Title</label>
          <Form.Input
            fluid
            icon="pencil alternate"
            iconPosition="left"
            placeholder="title"
            defaultValue={title}
            onChange={onTitleChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Deadline</label>
          <Form.Input
            fluid
            icon="clock"
            iconPosition="left"
            type="date"
            defaultValue={deadline}
            onChange={onDeadlineChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <Form.TextArea
            placeholder="Enter description..."
            style={{ minHeight: 140 }}
            defaultValue={describe}
            onChange={onDescChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Tags</label>
          <TagInput
            tagList={tagList}
            currentTags={currentTags}
            onTagChange={onTagChange}
          />
        </Form.Field>

        <Button color="teal" fluid size="large" onClick={onSubmit}>
          { type === 'add' ? 'Submit' : 'Update' }
        </Button>
      </Segment>
    </Form>
  );
  return FormTotal;
};


export default FormInput;
