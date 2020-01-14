import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

import NavBar from '../../NavBar';


type ProtectedProps = {
  path: string,
  component: any,
  exact: boolean,
}

type ProtectedState = {
  loading: Boolean,
  loggedIn: Boolean,
  name: string,
}


class ProtectedRoute extends React.Component<ProtectedProps, ProtectedState> {
  constructor(props: ProtectedProps) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: false,
      name: '',
    };

    axios
      .get('/logged_in')
      .then((res) => {
        this.setState({ loggedIn: res.data.logged_in, loading: false });
        if (res.data.logged_in) {
          this.setState({ name: res.data.name });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      path, component, exact,
    } = this.props;
    const { loggedIn, loading, name } = this.state;
    if (loading) {
      return null;
    }
    return loggedIn
      ? (
        <>
          <NavBar name={name} />
          <Container>
            <Route path={path} component={component} exact={exact} />
          </Container>
        </>
      )
      : <Redirect to="/login" />;
  }
}

export default ProtectedRoute;
