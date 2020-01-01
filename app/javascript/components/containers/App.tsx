import * as React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import TodoTable from '../TodoTable';
import TaskForm from '../TaskForm';
import Focus from '../Focus';
import NavBar from '../NavBar'

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={ TodoTable } />
        <Route path="/add" component={ TaskForm } />
        <Route path="/edit/:id" component={ TaskForm } />
        <Route path="/focus" component={ Focus } />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
