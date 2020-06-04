import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./routes";
import NotFoundPage from "../screens/404";

const PrivateRouter = (
  { component: Component, tipoUsuario: tipoUsuario, ...rest } // eslint-disable-line
) => <Route {...rest} render={(props) => <Component {...props} />} />;

const Routes = () => (
  <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
    <Switch>
      {routes.map((value, key) => {
        return (
          <PrivateRouter
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
          />
        );
      })}
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
