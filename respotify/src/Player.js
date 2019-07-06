import React, { Component } from 'react';
import Row from './layout/Row';

export default class Player extends Component {
  componentDidMount() {
    // Register callback for Spotify Web Playback SDK
    window.onSpotifyWebPlaybackSDKReady = () => {  
      this.player = new window.Spotify.Player({
        name: 'Test Player',
        getOAuthToken: callback => {
          callback('BQCEt_Kodj-CQlhaNqrIY68kiF_OQke40Hq9xYJrDb0jKSg9oloQP__8AeShi9b8ub_mmuCWnetRvknCjpmV1JnRxusO-wWXMOEuf6cWJA6LV-z4SIVvQGyTZ4qXyWP4sifDQUje6NdFL-x-g2-q-cco5kvVFLCVbdpcMwE1El-DWKkX-0-LOK2N');
        },
        volume: 1
      });

      this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
      this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
      this.player.addListener('account_error', ({ message }) => { console.error(message); });
      this.player.addListener('playback_error', ({ message }) => { console.error(message); });
      this.player.addListener('player_state_changed', state => { console.log(state); });
      this.player.addListener('ready', ({ device_id }) => { console.log('Ready with Device ID', device_id); });
      this.player.addListener('not_ready', ({ device_id }) => { console.log('Device ID has gone offline', device_id); });

      this.player.connect();
    }

    // Load Spotify Web Playback SDK
    let s = document.createElement('script');
    s.src = 'https://sdk.scdn.co/spotify-player.js';
    s.async = true;
    document.body.append(s);
  }

  _renderControlButtons() {
    return  (
      <div>
        <button onClick={() => {
          this.player.togglePlay().then(() => {
            console.log('Paused!');
          });
        }}>Pause</button>
        <button onClick={() => {
          this.player.previousTrack().then(() => {
            console.log('Resumed!');
          });
        }}>Previous</button>
        <button onClick={() => {
          this.player.nextTrack().then(() => {
            console.log('Resumed!');
          });
        }}>Next</button>
      </div>
    );
  }

  render() {
    return (
      <Row className="player-control">
        <div className="light-text">LEFT</div>
        {this._renderControlButtons()}
        <div className="light-text">RIGHT</div>
      </Row>
    );
  }
}
