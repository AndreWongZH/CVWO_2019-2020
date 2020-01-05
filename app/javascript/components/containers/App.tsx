import * as React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import TodoTable from '../TodoTable';
import TaskForm from '../TaskForm';
import Focus from '../Focus';
import NavBar from '../NavBar';


const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={TodoTable} />
          <Route path="/add" component={TaskForm} />
          <Route path="/edit/:id" component={TaskForm} />
          <Route path="/focus" component={Focus} />
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>
);

export default App;
