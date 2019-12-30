import React from 'react';

import { Form, Segment, Button } from 'semantic-ui-react';

const FormInput = ({
  title,
  deadline,
  desc,
  tag,
  type,
  onTitleChange,
  onDeadlineChange,
  onDescChange,
  onTagChange,
  onSubmit,
}) => {
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
            defaultValue={desc}
            onChange={onDescChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Tags</label>
          <Form.Input
            fluid
            icon="paperclip"
            iconPosition="left"
            placeholder="tags"
            defaultValue={tag}
            onChange={onTagChange}
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
