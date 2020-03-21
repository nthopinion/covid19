import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import App from "./containers/App";
import About from "./components/About";
import PhysicianView from "./components/PhysicianView";

import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import AuthProvider from "./AuthProvider";

const store = createStore(rootReducer, applyMiddleware(thunk));
// const ProtectedPhysicianView = withAdalLoginApi(PhysicianView, () => <div>loading</div>, (error) => <div>error</div>);

render(
  <Provider store={store}>
    <Router>
      <Route
        exact
        path="/bIiOOIIqgwEXwUU3SaD0F9"
        component={AuthProvider(PhysicianView)}
      />
      <Route exact path="/physician-public" component={PhysicianView} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
