import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Grid,List, Button } from 'semantic-ui-react'

import { Provider } from 'react-redux'
import { Grid,List, Button } from 'semantic-ui-react'
import App from './containers/App'
import About from './components/About'
import PhysicianView from './components/PhysicianView'
import * as serviceWorker from './serviceWorker'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import AuthProvider from './AuthProvider'
import styles from './styles/NavLink.css'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
// const ProtectedPhysicianView = withAdalLoginApi(PhysicianView, () => <div>loading</div>, (error) => <div>error</div>);

render(
  <Provider store={store}>
    <Router>
    <div className = {styles.NavLinks} id="nav">
      <Grid rows={3}>
        
        <Grid.Column>

          <Grid.Row>
          <Button floated="right"  color='teal' href="https://nonprofit.covid19webapp.com/about/#lp-pom-text-104"> About </Button>
          </Grid.Row>

          <Grid.Row>
          <Button floated="right"  color='teal' href=" https://nonprofit.covid19webapp.com/about/#lp-pom-text-90"> Are you a physcian? </Button>
          </Grid.Row>
          
          <Grid.Row>
          <Button floated="right"  color='teal' href=" https://nonprofit.covid19webapp.com/about/#lp-pom-text-26 "> Are you a developer? </Button>
          </Grid.Row>
          
        </Grid.Column> 

      </Grid>
      </div>
      <Route exact path='/physician' component={AuthProvider(PhysicianView)} />
      <Route exact path='/physician-public' component={PhysicianView} />
      <Route exact path='/about' component={About} />
      <Route exact path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
