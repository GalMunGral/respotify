import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="left-menu"></div>
      <div className="main">
        { 'a '.repeat(10 ** 4) }
      </div>
      <div className="player-control"></div>
    </div>
  );
}

export default App;
