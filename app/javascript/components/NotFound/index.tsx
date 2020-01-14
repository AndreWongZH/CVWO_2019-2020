import * as React from 'react';
import {
  Button, Form, Grid, Header, Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header id="addHead" as="h2" color="teal" textAlign="center">
        404 Page not Found
      </Header>
      <Form size="large">
        <Segment stacked>
          <Link to="/">
            <Button fluid size="large">
              Return to Homepage
            </Button>
          </Link>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default NotFound;
