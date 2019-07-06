import React from 'react';
import './App.css';
import Player from './Player';

function App() {
  return (
    <div className="app-container">
      <div className="left-menu"></div>
      <div className="main">
        { 'a '.repeat(10 ** 4) }
      </div>
      <Player></Player>
    </div>
  );
}

export default App;
