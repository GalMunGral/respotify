import React, { Component } from 'react';
import { Row, Column } from './layout';

let ITEM_WIDTH = 400;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: null,
      paused: true,
      duration: -1,
      position: 0,
      volume: 0
    }
  }

  componentDidMount() {
    // Register callback for Spotify Web Playback SDK
    window.onSpotifyWebPlaybackSDKReady = () => {  
      this.player = new window.Spotify.Player({
        name: 'Test Player',
        getOAuthToken: callback => {
          callback(this.props.accessToken);
        },
        volume: 1
      });

      this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
      this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
      this.player.addListener('account_error', ({ message }) => { console.error(message); });
      this.player.addListener('playback_error', ({ message }) => { console.error(message); });
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        this.player.getVolume().then(volume => {
          this.setState({ volume });
        });
      });
      this.player.addListener('not_ready', ({ device_id }) => { console.log('Device ID has gone offline', device_id); });
      this.player.addListener('player_state_changed', state => {
        // Check if playback has been paused
        console.log(state);
        this.setState({
          currentTrack: state.track_window.current_track,
          paused: state.paused,
          duration: state.duration,
          position: state.position,
        });
      });

      // Check playback progress periodically
      window.setInterval(() => {
        this.player.getCurrentState().then(state => {
          if (!state) return;
          this.setState({
            duration: state.duration,
            position: state.position,
          });
        });
      }, 100);

      this.player.connect();
    }

    // Load Spotify Web Playback SDK
    let s = document.createElement('script');
    s.src = 'https://sdk.scdn.co/spotify-player.js';
    s.async = true;
    document.body.append(s);
  }

  _renderThumbnail() {
    let track = '';
    let artists = '';
    if (this.state.currentTrack) {
      track = this.state.currentTrack.name;
      artists = this.state.currentTrack.artists.map(a => a.name).join(', ');
    }
    return (
      <Row justifyContent="start" style={{ width: ITEM_WIDTH, padding: 0 }}>
        {
          this.state.currentTrack ? (
            <React.Fragment>
              <img className="thumbnail-img"
                src={this.state.currentTrack.album.images[0].url}
                alt="Album cover"/>   
              <div>
                <div className="thumbnail-title">{track}</div>
                <div className="thumbnail-subtitle">{artists}</div>
              </div> 
            </React.Fragment>  
          ) : null
        }     
        
      </Row>
      
    );
  }

  _renderPlaybackControl() {
    const ICON_SIZE = 22;
    return  (
      <Row style={{ marginTop: 5 }}>
        <div onClick={() => this.player.previousTrack()}>
          <i className="material-icons clickable" style={{
            fontSize: ICON_SIZE
          }}>skip_previous</i>
        </div>

        <div onClick={() => this.player.togglePlay()}>
          <i className="material-icons clickable" style={{
            fontSize: ICON_SIZE,
            height: ICON_SIZE,
            width: ICON_SIZE,
            padding: 5,
            margin: '0 20px',
            borderRadius: ICON_SIZE / 2 + 5,
            border: '1px solid'
          }}>{this.state.paused ? 'play_arrow' : 'pause'}</i>
        </div>

        <div onClick={() => this.player.nextTrack()}>
          <i className="material-icons clickable" style={{
            fontSize: ICON_SIZE,
          }}>skip_next</i>
        </div>
      </Row>
    );
  }

  _renderProgressBar() {
    const PROGRESS_BAR_WIDTH = 500;
    return (
      <Row alignItems="start" className="progress-bar">
        <div className="small-text">{
          this.state.currentTrack
          ? Math.floor(this.state.position / 1000 / 60) + ':' 
            + String(Math.floor(this.state.position / 1000 % 60)).padStart(2, '0')
          : ''
        }</div>

        <div
          className="bar-background" 
          style={{ width: PROGRESS_BAR_WIDTH }}
          onClick={e => {
            let x = e.clientX;
            let element = e.nativeEvent.target;
            let boundingRect = element.getBoundingClientRect();
            let percentage = (x - boundingRect.left) / PROGRESS_BAR_WIDTH;
            this.player.seek(this.state.duration * percentage);
          }}
        >
          <div className="bar-highlight" style={{
            width: this.state.position / this.state.duration * PROGRESS_BAR_WIDTH
          }}></div>
        </div>

        <div className="small-text">{
          this.state.currentTrack
          ? Math.floor(this.state.duration / 1000 / 60) + ':'
            + String(Math.floor(this.state.duration / 1000 % 60)).padStart(2, '0')
          : ''
        }</div>
      </Row>
     
    )
  }

  _renderVolumeControl() {
    const VOLUME_BAR_WIDTH = 80;
    return (
      <Row className="volume-bar"
        justifyContent="flex-end"
        alignItems="center"
        style={{ width: ITEM_WIDTH }}
      >
        <i className="material-icons clickable">volume_up</i>
        <div
          className="bar-background"
          style={{ width: VOLUME_BAR_WIDTH }}
          onClick={e => {
            let x = e.clientX;
            let element = e.nativeEvent.target;
            let boundingRect = element.getBoundingClientRect();
            let volume = (x - boundingRect.left) / VOLUME_BAR_WIDTH;
            this.player.setVolume(volume).then(() => {
              this.setState({ volume });
            });
          }}
        >
          <div className="bar-highlight" style={{
            width: this.state.volume * VOLUME_BAR_WIDTH
          }}></div>
        </div>
      </Row>
    );
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
