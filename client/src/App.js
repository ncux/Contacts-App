import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Navbar } from "./components/layout/navbar/navbar";
import { Home } from "./components/home/home";
import { About } from "./components/about/about";
import { ContactsState } from "./contexts/contact";
import { AuthState } from "./contexts/authentication";
import { Registration } from "./components/auth/registration/registration";
import { Login } from "./components/auth/login/login";
import { AlertState } from "./contexts/alert";
import { Alert } from "./components/layout/alert/alert";
import { setAuthToken } from "./config/httpInterceptor";
import { AuthGuard } from "./components/routes/authGuard";

// apply the JWT, if available, into the http request headers
if(localStorage.token) {
    setAuthToken(localStorage.token);
}

export const App = () => {

  return (
          <AuthState>
              <ContactsState>
                  <AlertState>
                  <Router>
                      <Fragment>
                          <Navbar />
                          <div className="container">
                              <Alert />
                              <Switch>
                                  <AuthGuard exact path="/" component={ Home } />
                                  <Route exact path="/about" component={ About } />
                                  <Route exact path="/register" component={ Registration } />
                                  <Route exact path="/login" component={ Login } />
                              </Switch>
                          </div>
                      </Fragment>
                  </Router>
                  </AlertState>
              </ContactsState>
          </AuthState>
  );

};
