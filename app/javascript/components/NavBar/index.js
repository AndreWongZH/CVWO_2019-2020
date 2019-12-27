import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { updateNav } from '../store/actions'
import { Redirect } from 'react-router-dom'

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  handleItemClick = (e, { name }) => {
    const { updateNav } = this.props
    updateNav(name)
    this.setState({ redirect: true })
  }

  render() {
    const { navRoute } = this.props
    const { redirect } = this.state

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
              <Input className='icon' icon='search' placeholder='Search...' />
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
  updateNav: (title) => dispatch(updateNav(title))
})

export default connect(matchStateToProps, matchDispatchToProps)(NavBar);