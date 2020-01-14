import * as React from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateNav } from '../store/actions';

import {
  ReduxStateType, OnClickEventType,
} from '../TypeDeclarations';
import { UpdateNavType } from '../store/actions/ActionDeclaration';


type NavBarProps = {
  updateNav: UpdateNavType,
  name: string
}

type NavBarState = {
  redirect: Boolean
}


class NavBar extends React.Component<
NavBarProps & ReduxStateType & RouteComponentProps, NavBarState> {
  constructor(props: NavBarProps & ReduxStateType & RouteComponentProps) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const { updateNav, location } = this.props;

    if (location.pathname.match(/edit/)) {
      updateNav({ title: '/edit' });
    } else {
      updateNav({ title: location.pathname });
    }
  }

  // used to toggle navigation bar and redirect to correct route
  handleItemClick = (e: OnClickEventType, data: MenuItemProps) => {
    const { updateNav, navRoute } = this.props;

    if (data.name !== navRoute) {
      if (data.name === '/focus' || data.name === '/') {
        updateNav({ title: data.name, loading: true });
      } else {
        updateNav({ title: data.name });
      }

      this.setState({ redirect: true });
    }
  }

  handleLogout = () => {
    axios.get('/logout').then(() => {
      window.location.reload();
    });
  }

  render() {
    const { navRoute, location, name } = this.props;
    const { redirect } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="/"
            content="Todo Dashboard"
            active={navRoute === '/'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="/add"
            content="Add new task"
            active={navRoute === '/add'}
            onClick={this.handleItemClick}
            disabled={(/edit/).test(location.pathname)}
          />
          <Menu.Item
            name="/focus"
            content="Focus on Me"
            active={navRoute === '/focus'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item header>{name}</Menu.Item>
            <Menu.Item
              name="logout"
              onClick={this.handleLogout}
            />
          </Menu.Menu>
          {navRoute === '/edit'
            && (
              <Menu.Item
                name="/edit"
                content="Update todo"
                active={navRoute === '/edit'}
              />
            )}
        </Menu>
        {redirect && <Redirect to={navRoute} />}
      </div>
    );
  }
}

const matchStateToProps = (state: ReduxStateType) => {
  return {
    navRoute: state.navRoute,
  };
};

const matchDispatchToProps = (dispatch: Function) => ({
  updateNav: ({
    title, loading,
  }: { title: string, loading?: Boolean }) => dispatch(updateNav({ title, loading })),
});

// used as any as a work-around for typescript because withRouter is not compatible() with connect()
export default withRouter(connect(matchStateToProps, matchDispatchToProps)(NavBar)) as any;
