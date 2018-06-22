import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Article from "./pages/Article";
import NoMatch from "./pages/NoMatch"

class App extends Component {
  render() {
    return (
      <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Article} />
        <Route exact path="/articles" component={Article} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
    );
  }
}

export default App;
