import React, { Component } from 'react'
import { Menu, Input, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { updateNav, updateTable } from '../store/actions'

import { Redirect } from 'react-router-dom'

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      search: ''
    }
  }

  handleItemClick = (e, { name }) => {
    const { updateNav } = this.props
    updateNav(name)
    this.setState({ redirect: true })
  }

  handleKeyDown = (e) => {
    const { updateTable } = this.props

    if (e.key === 'Enter') {
      const search = e.target.value
      updateTable({
        search
      })
    }
  }
  
  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
  }

  handleReset = () => {
    const { updateTable } = this.props
    const { search } = this.state

    if (search !== '') {
      this.setState({ search: '' })
      updateTable({
        search: ''
      })
    }
  }

  render() {
    const { navRoute } = this.props
    const { redirect, search } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="/"
            content='Todo Dashboard'
            active={navRoute === '/'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="/add"
            content='Add new task'
            active={navRoute === '/add'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="/focus"
            content='Focus on Me'
            active={navRoute === '/focus'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input
                className='icon'
                icon='search'
                placeholder='Search...'
                value={search}
                onChange={this.handleSearchChange}
                onKeyDown={this.handleKeyDown}
              />
              <Button onClick={this.handleReset }>Reset</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {redirect && <Redirect to={navRoute} />}
      </div>
    )
  }
}

const matchStateToProps = (state) => {
  return {
    navRoute: state.navRoute
  }
}

const matchDispatchToProps = (dispatch) => ({
  updateNav: (title) => dispatch(updateNav(title)),
  updateTable: (values) => dispatch(updateTable(values))
})

export default connect(matchStateToProps, matchDispatchToProps)(NavBar);