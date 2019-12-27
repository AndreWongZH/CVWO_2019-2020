import React from 'react';
import { Label } from 'semantic-ui-react'


const LabelCell = ({ data }) => {
    const list_tags = data.split(",")
    const labels = list_tags.map((tag) => (
        <React.Fragment>
            <Label color="red" >{tag}</Label>
        </React.Fragment>
    ))
    return labels
}

export default LabelCell