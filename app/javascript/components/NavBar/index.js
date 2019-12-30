import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateNav, updateTable } from '../store/actions';

import SearchBar from './SearchBar';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      search: '',
    };
  }

  componentDidMount() {
    const { updateNav, location, sort } = this.props;
    if (location.pathname.match(/edit/)) {
      updateNav('/edit');
    } else {
      updateNav(location.pathname);
    }

    this.setState({ search: sort.search });
  }

  handleItemClick = (e, { name }) => {
    const { updateNav } = this.props;
    updateNav(name);
    this.setState({ redirect: true });
  }

  handleKeyDown = (e) => {
    const { updateTable } = this.props;

    if (e.key === 'Enter') {
      const search = e.target.value;
      updateTable({
        search,
      });
    }
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

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
    const { navRoute } = this.props;
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

const matchStateToProps = (state) => {
  return {
    navRoute: state.navRoute,
    sort: state.sort,
  };
};

const matchDispatchToProps = (dispatch) => ({
  updateNav: (title) => dispatch(updateNav(title)),
  updateTable: (values) => dispatch(updateTable(values)),
});

export default connect(matchStateToProps, matchDispatchToProps)(NavBar);
