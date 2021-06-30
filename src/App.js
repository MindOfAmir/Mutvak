import { Route } from 'react-router';
import { Switch } from 'react-router';
import { Fragment } from 'react';
import Welcome from './components/Pages/Welcome';
import Store from './components/Pages/Store';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/store">
          <Store></Store>
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
