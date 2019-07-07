import React, { Component } from 'react';
import './App.css';
import { LoginContext } from './index';
import { Column, Row } from './layout';
import Player from './Player';
import Main from './Main';

export default class App extends Component {

  render() {
    return (
      <LoginContext.Consumer>
        {({ accessToken, refreshToken }) => (
          <div className="app-container">
            
            <Column alignItems="flex-start" className="left-menu">
              <Row className="left-menu-title">
                <i className="material-icons">replay</i>
                <h1>ReSpotify</h1>
              </Row>
            </Column>
            
            <Main accessToken={accessToken}/>
            <Player accessToken={accessToken}/>

          </div>
        )}
      </LoginContext.Consumer>
    );
  }
}