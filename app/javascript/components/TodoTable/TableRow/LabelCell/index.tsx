import * as React from 'react';
import { Label } from 'semantic-ui-react';

import { StyledLabel } from '../../../StyledComponents';


const LabelCell = ({ data } : { data : string }) => {
  const listTags = data.split(',');
  const labels = listTags.map((tag) => (
    <StyledLabel key={tag}>
      <Label color="red">{tag}</Label>
    </StyledLabel>
  ));
  return (
    <>
      {labels}
    </>
  );
};

export default LabelCell;
