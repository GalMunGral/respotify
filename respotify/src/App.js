import React from 'react';
import './App.css';
import Player from './Player';
import { LoginContext } from './index';

export default function App() {
  return (
    <LoginContext.Consumer>
      {({ accessToken, refreshToken }) => (
        <div className="app-container">
          <div className="left-menu"></div>
          <div className="main">
            { '何 '.repeat(10 ** 4) }
          </div>
          <Player accessToken={accessToken}/>
        </div>
      )}
    </LoginContext.Consumer>
  );
}