// Packages
import { Route, Switch } from "react-router-dom";

// Pages
import { Authentication } from "../pages/auth/Authentication";
import { Home } from "../pages/dashboard/Home";

export function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/authentication">
        <Authentication />
      </Route>
    </Switch>
  );
}
