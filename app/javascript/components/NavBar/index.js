import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='Todo Dashboard'
            active={activeItem === 'Todo Dashboard'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Add new task'
            active={activeItem === 'Add new task'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Focus on Me'
            active={activeItem === 'Focus on Me'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input className='icon' icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}