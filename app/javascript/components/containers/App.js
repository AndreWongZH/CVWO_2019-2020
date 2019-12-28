import React from "react"

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'

const store = configureStore();

import NavBar from '../NavBar'
import TodoTable from '../TodoTable'
import TaskForm from '../TaskForm'
import Focus from '../Focus'
import { Container } from "semantic-ui-react";


class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Container>
            <Switch>
              <Route exact path="/" render={() => <TodoTable /> } />
              <Route path="/add" render={(props) => <TaskForm {...props}/>} />
              <Route path="/edit/:id" render={(props) => <TaskForm {...props}/>} />
              <Route path="/focus" render={() => <Focus />} />
            </Switch>
          </Container>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
