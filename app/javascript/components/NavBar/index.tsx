import * as React from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';

import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateNav, updateTable } from '../store/actions';

import SearchBar from './SearchBar';
import {
  ReduxStateType, OnChangeEventType, OnClickEventType, UpdateTableValuesType,
} from '../TypeDeclarations';
import { UpdateNavType, UpdateTableType } from '../store/actions/ActionDeclaration';

type NavBarProps = {
  updateNav: UpdateNavType,
  updateTable: UpdateTableType,
}

type NavBarState = {
  redirect: Boolean,
  search: string
}

class NavBar extends React.Component<
NavBarProps & ReduxStateType & RouteComponentProps, NavBarState> {
  constructor(props: NavBarProps & ReduxStateType & RouteComponentProps) {
    super(props);
    this.state = {
      redirect: false,
      search: '',
    };
  }

  componentDidMount() {
    const { updateNav, location, sort } = this.props;

    if (location.pathname.match(/edit/)) {
      updateNav({ title: '/edit' });
    } else {
      updateNav({ title: location.pathname });
    }

    this.setState({ search: sort.search });
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

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { updateTable } = this.props;
    const { search } = this.state;

    if (e.key === 'Enter') {
      updateTable({
        search,
      });
    }
  }

  handleSearchChange = (e: OnChangeEventType) => {
    this.setState({ search: e.target.value });
  }

  // reset search query
  handleReset = () => {
    const { updateTable } = this.props;
    const { search } = this.state;

    if (search !== '') {
      this.setState({ search: '' });
      updateTable({
        search: '',
      });
    }
  }

  render() {
    const { navRoute, location } = this.props;
    const { redirect, search } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            style={{ paddingTop: '16px', paddingBottom: '16px' }}
            name="/"
            content="Todo Dashboard"
            active={navRoute === '/'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            style={{ paddingTop: '16px', paddingBottom: '16px' }}
            name="/add"
            content="Add new task"
            active={navRoute === '/add'}
            onClick={this.handleItemClick}
            disabled={(/edit/).test(location.pathname)}
          />
          <Menu.Item
            style={{ paddingTop: '16px', paddingBottom: '16px' }}
            name="/focus"
            content="Focus on Me"
            active={navRoute === '/focus'}
            onClick={this.handleItemClick}
          />
          {navRoute === '/edit'
            && (
              <Menu.Item
                style={{ paddingTop: '16px', paddingBottom: '16px' }}
                name="/edit"
                content="Update todo"
                active={navRoute === '/edit'}
              />
            )}
          {navRoute === '/'
            && (
              <SearchBar
                handleSearchChange={this.handleSearchChange}
                handleKeyDown={this.handleKeyDown}
                handleReset={this.handleReset}
                search={search}
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
    sort: state.sort,
  };
};


const matchDispatchToProps = (dispatch: Function) => ({
  updateNav: ({
    title, loading,
  }: { title: string, loading?: Boolean }) => dispatch(updateNav({ title, loading })),
  updateTable: (values: UpdateTableValuesType) => dispatch(updateTable(values)),
});

// used as any as a work-around for typescript because withRouter is not compatible() with connect()
export default withRouter(connect(matchStateToProps, matchDispatchToProps)(NavBar)) as any;
