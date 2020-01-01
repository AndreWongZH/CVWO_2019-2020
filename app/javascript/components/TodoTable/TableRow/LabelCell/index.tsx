import * as React from 'react';
import { Label } from 'semantic-ui-react';


const LabelCell = ({ data } : { data : string }) => {
  const listTags = data.split(',');
  const labels = listTags.map((tag) => (
    <React.Fragment key={tag}>
      <Label color="red">{tag}</Label>
    </React.Fragment>
  ));
  return (
    <>
      {labels}
    </>
  );
};

export default LabelCell;
