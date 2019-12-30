import React, {Component, Fragment} from 'react';
import {Board, Home, Versions, LoginForm, UserPreview} from "../../Containers";
import {Projects} from "../../Containers/index";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import {Project} from "../index";
// import {PrivateRoute} from "../index";


export default class App extends Component {
    /*  state = {
          isAuthenticated: false,
      };

      authenticate = (cb) => {
          this.setState({
              isAuthenticated : true
          });
          setTimeout(cb, 100); // fake async
      };

      signout = (cb) => {
          this.setState({
              isAuthenticated : false
          });
          setTimeout(cb, 100);
      };*/

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
/*
        PrivateRoute2({children, ...rest}) {
            return (
              <Route
                {...rest}
                render={
                    ({location}) =>
                      fakeAuth.isAuthenticated ? (
                        children
                      ) : (
                        <Redirect
                          to={{
                              pathname: "/login",
                              state: {from: location}
                          }}
                        />
                      )
                }
              />
            );
        }

    PublicPage() {
        return <h3>Public</h3>;
    }

    ProtectedPage() {
        return <h3>Protected</h3>;
    }*/


    render() {
        return (
          <Fragment>
              <div className="Old">
                  <div className="App">
                      <Versions/>

                      {/* TODO: поставить exact для пути "/" после того,
                            как добавлю список проектов в Project*/}
                      <Route exact path="/" component={Projects}/>
                      <Route  path="/p:projectId" component={Project}/>

                      {/*<Route path="/board/:boardId" component={Board}/>*/}
                      {/*<Route path="/projects" component={Projects}/>*/}
                  </div>
              </div>

              {/*<div className="new">
                  <Router>
                      <div>
                          <AuthButton isAuthenticated={this.state.isAuthenticated}/>

                          <ul>
                              <li>
                                  <Link to="/public">Public Page</Link>
                              </li>
                              <li>
                                  <Link to="/protected">Protected Page</Link>
                              </li>
                          </ul>

                          <Switch>
                              <Route path="/public" component={this.PublicPage}>
                              </Route>
                              <Route path="/login" component={LoginPage}>
                              </Route>
                              <PrivateRoute path="/protected" auth={this.state.isAuthenticated} component={this.ProtectedPage}>
                              </PrivateRoute>
                          </Switch>
                      </div>
                  </Router>

              </div>*/}
          </Fragment>
        )
    }
};

/*
const LoginPage = (authenticate) => {
    let history = useHistory();
    let location = useLocation();

    let {from} = location.state || {from: {pathname: "/"}};
    let login = () => {
        authenticate(() => {
            history.replace(from);
        });
    };

    return (
      <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={login}>Log in</button>
      </div>
    );
}

function AuthButton (isAuthenticated) {
    let history = useHistory();

    return isAuthenticated ? (
      <p>
          Welcome!{" "}
          <button
            onClick={() => {
                this.signout(() => history.push("/"));
            }}
          >
              Sign out
          </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    );
}*/
