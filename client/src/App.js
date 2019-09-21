import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Navbar } from "./components/layout/navbar/navbar";
import { Home } from "./components/home/home";
import { About } from "./components/about/about";
import { ContactsState } from "./contexts/contact/context";

export const App = () => {

  return (
      <ContactsState>
          <Router>
              <Fragment>
                  <Navbar />
                  <div className="container">
                      <Switch>
                          <Route exact path="/" component={ Home } />
                          <Route exact path="/about" component={ About } />
                      </Switch>
                  </div>

              </Fragment>
          </Router>
      </ContactsState>
  );

};
