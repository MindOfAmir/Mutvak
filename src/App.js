import { Route } from 'react-router';
import { Switch } from 'react-router';
import { Fragment } from 'react';
import Welcome from './components/Pages/Welcome';
import Store from './components/Pages/Store';
import Admin from './components/Admin/Admin';
import Recovery from './components/Pages/Recovery';
import Thankyou from './components/Pages/Thankyou';

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
          <Store />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/recovery">
          <Recovery />
        </Route>
        <Route path="/thank-you">
          <Thankyou />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
