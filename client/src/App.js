import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import PatientBoard from './containers/PatientBoard';
import About from './components/About';
import PhysicianView from './components/PhysicianView';
import PhysicianSignup from './components/PhysicianSignup';

import rootReducer from './reducers';
import AuthProvider from './AuthProvider';
import QuestionCard from './components/QuestionCard';

import './styles/App.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

export class App extends Component {
  render() {
    return (
      <div className="App">
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Router>
              <Route
                exact
                path="/bIiOOIIqgwEXwUU3SaD0F9"
                component={AuthProvider(PhysicianView)}
              />
              <Route exact path="/signup" component={PhysicianSignup} />
              <Route exact path="/physician-public" component={PhysicianView} />
              <Route exact path="/about" component={About} />
              <Route exact path="/questionView" component={QuestionCard} />
              <Route exact path="/" component={AuthProvider(PatientBoard)} />
            </Router>
          </Provider>
        </I18nextProvider>
      </div>
    );
  }
}

export default App;
