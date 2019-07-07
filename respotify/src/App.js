import React, { Component } from 'react';
import './App.css';
import Player from './Player';

const AUTHORIZATION_URL = 'http://127.0.0.1:5000/authorize?implicit=false';

export default class App extends Component {
  componentDidMount() {
    let queryString = window.location.search;
    let searchParams = new URLSearchParams(queryString);
    if (!searchParams.has('access_token')) {
      window.location.assign(AUTHORIZATION_URL);
    }
  }
  render() {
    return (
      <div className="app-container">
        <div className="left-menu"></div>
        <div className="main">
          { '何 '.repeat(10 ** 4) }
        </div>
        <Player></Player>
      </div>
    );
  }
}