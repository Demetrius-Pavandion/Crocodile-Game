import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import socket from '../../utils/socket';
import history from '../../utils/history';

import Header from '../Header/Header';
import HomePage from '../HomePage';
import Room from '../Room';
import About from '../About/About';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header history={history} socket={socket} />
          <Segment>
            <Route path='/about' component={About} />
            <Route path='/room/:id/:maxPoints/:roundDuration' component={({match}) => <Room socket={socket} match={match}/> } />
            <Route exact path='/' component={() => <HomePage socket={socket} history={history} />} />
          </Segment>
        </div>
      </Router>
    );
  }
}

export default App;