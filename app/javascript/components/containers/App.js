import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import TodoTable from '../TodoTable';
import TaskForm from '../TaskForm';
import Focus from '../Focus';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <TodoTable {...props} />} />
        <Route path="/add" render={(props) => <TaskForm {...props} />} />
        <Route path="/edit/:id" render={(props) => <TaskForm {...props} />} />
        <Route path="/focus" render={(props) => <Focus {...props} />} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
