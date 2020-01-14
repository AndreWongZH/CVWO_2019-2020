import * as React from 'react';
import {
  Button, Form, Grid, Header, Image, Segment, Icon,
} from 'semantic-ui-react';

const logo = require('../../../assets/images/todo_logo.png');

class Login extends React.Component {
  handleLogin = () => {
    window.location.replace(`${window.location.origin}/auth/google_oauth2`);
  };

  render() {
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header id="addHead" as="h2" color="teal" textAlign="center">
            <Image src={logo} />
            Start using Todo app
            <br />
            Login to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Button fluid size="large" onClick={this.handleLogin}>
                <Icon name="google" />
                Sign in with Google
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
