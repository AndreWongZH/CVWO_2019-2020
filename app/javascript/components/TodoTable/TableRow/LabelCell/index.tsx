import * as React from 'react';
import { Label } from 'semantic-ui-react';


const LabelCell = ({ data } : { data : string }) => {
  const listTags = data.split(',');
  const labels = listTags.map((tag) => (
    <div className="tags" key={tag}>
      <Label color="red">{tag}</Label>
    </div>
  ));
  return (
    <>
      {labels}
    </>
  );
};

export default LabelCell;
