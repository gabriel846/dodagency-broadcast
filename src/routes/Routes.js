// Packages
import { Route, Switch } from "react-router-dom";

// Pages
import { Home } from "../pages/Home";

export function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}
