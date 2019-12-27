import React from "react"

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'

const store = configureStore();

import NavBar from '../NavBar'
import TodoTable from '../TodoTable'
import TaskForm from '../TaskForm'
import Focus from '../Focus'


class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <TodoTable /> } />
            <Route path="/add" render={() => <TaskForm />} />
            <Route path="/update" render={() => <TaskForm />} />
            <Route path="/focus" render={() => <Focus />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
