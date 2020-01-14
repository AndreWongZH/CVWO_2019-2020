import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import TodoTable from '../TodoTable';
import TaskForm from '../TaskForm';
import Focus from '../Focus';
import Login from '../Login';
import NotFound from '../NotFound';
import ProtectedRoute from './ProtectedRoute';

import '../../../assets/stylesheets/App.css';


const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={TodoTable} />
          <ProtectedRoute exact path="/add" component={TaskForm} />
          <ProtectedRoute exact path="/edit/:id" component={TaskForm} />
          <ProtectedRoute exact path="/focus" component={Focus} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
