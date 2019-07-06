import React, { Component } from 'react';
import { Row, Column } from './layout';

export default class Player extends Component {
  componentDidMount() {
    // Register callback for Spotify Web Playback SDK
    window.onSpotifyWebPlaybackSDKReady = () => {  
      this.player = new window.Spotify.Player({
        name: 'Test Player',
        getOAuthToken: callback => {
          // TODO: Refresh token if needed
          let searchParams = new URLSearchParams(window.location.search);
          callback(searchParams.get('access_token'));
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

  _renderThumbnail() {
    return (
      <Row justifyContent="start" style={{ width: 100, padding: 0 }}>
        <div style={{
          background: 'white',
          width: 50,
          height: 50,
          margin: 10
        }}></div>
        <div>
          <div className="thumbnail-title">Yo</div>
          <div className="thumbnail-subtitle">hey</div>
        </div>
      </Row>
      
    );
  }

  _renderPlaybackControl() {
    return  (
      <Row style={{ marginTop: 5 }}>
        <div onClick={() => this.player.previousTrack()}>
          <i className="material-icons clickable" style={{
            fontSize: 24
          }}>skip_previous</i>
        </div>

        <div onClick={() => this.player.togglePlay()}>
          <i className="material-icons clickable" style={{
            fontSize: 24,
            height: 24,
            width: 24,
            padding: 5,
            margin: '0 20px',
            borderRadius: 24 / 2 + 5,
            border: '1px solid'
          }}>pause</i>
        </div>

        <div onClick={() => this.player.nextTrack()}>
          <i className="material-icons clickable" style={{
            fontSize: 24,
          }}>skip_next</i>
        </div>
      </Row>
    );
  }

  _renderProgressBar() {
    return (
      <Row alignItems="start">
        <div className="small-text">some time</div>
        <div style={{position: 'relative', margin: 5, height:3, width: 500, background: '#404040'}}>
          <div style={{position: 'absolute', top: 0, height:3, width: 250, background: 'green'}}></div>
        </div>
        <div className="small-text">total time</div>
      </Row>
     
    )
  }

  _renderVolumeControl() {
    return <div style={{
      width: 100,
    }}>{/* placeholder */}</div>;
  }

  render() {
    return (
      <Row className="player-control">
        {this._renderThumbnail()}
        <Column justifyContent="start" style={{ alignSelf: 'stretch', padding: 0 }}>
          {this._renderPlaybackControl()}
          {this._renderProgressBar()}
        </Column>
        {this._renderVolumeControl()}
      </Row>
    );
  }
}
