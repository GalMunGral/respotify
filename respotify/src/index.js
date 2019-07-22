import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const AUTHORIZATION_URL = 'http://127.0.0.1:3001/authorize?implicit=false';

// Check login status before rendering
let searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('access_token')) {
  window.location.assign(AUTHORIZATION_URL);
}

export const LoginContext = React.createContext();

ReactDOM.render(
  <LoginContext.Provider value={{
    accessToken: searchParams.get('access_token'),
    refreshToken: searchParams.get('refresh_token')
  }}>
    <App />
  </LoginContext.Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
