import React from 'react';
import {Redirect, Route} from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({component: Component, auth, ...rest}) {
    return (
      <Route {...rest}>
          {
              (props) =>
                auth ? (
                  <Component {...props}/>
                ) : (
                  <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                  />
                )
          }
      </Route>
    );
}