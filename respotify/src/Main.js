import React, { Component } from 'react';
import { Row, Column } from './layout';

const LEFT_MARGIN = 40;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      albums: []
    }
  }

  componentDidMount() {
    const artists = [
      ['Sublab', '3tjRdPCZTpme7vslZJYtJx'],
      ['Hebe Tien 田馥甄', '14bJhryXGk6H6qlGzwj3W5'],
      ['Mamamoo', '0XATRDCYuuGhk0oE7C0o5G']
    ];

    let promises = artists.map(([artistName, artistId]) =>
      fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: new Headers({
          'Authorization': 'Bearer ' + this.props.accessToken
        })
      }).then(res => res.json())
      .then(json => ({
        artistName: artistName,
        items: json.items
      }))
    );

    Promise.all(promises)
      .then(albums => { this.setState({ albums }); })
      .catch(err => console.log(err));
  }

  render() {
    const tabs = ['featured', 'podcasts', 'charts', 
      'genres & moods', 'new releases', 'discover'];
    return (
      <div className="main">
        <Row justifyContent="center" style={{
          marginTop: 30,
          marginBottom: 50,
          letterSpacing: 1,
          fontSize: 16,
          userSelect: 'none'
        }}>
          {tabs.map((tab, i) => (
            <Column key={i} 
              style={{
                margin: '0 20px',
                color: i === this.state.selectedIndex ? 'white' : '#B3B3B3'
              }}
            >
              <h5 style={{ marginTop: 0, marginBottom: 5 }}
                onClick={() => {
                  this.setState({ selectedIndex: i});
                }}
              >
                {tab.toUpperCase()}
              </h5>
              <div style={{
                height: 2, width: 30,
                background: i === this.state.selectedIndex ? '#1EB953' : 'transparent' 
              }}></div>
            </Column>
          ))}
        </Row>
        {this.state.albums.map((list, i) => (
          <React.Fragment key={i}>
            <h1 style={{ fontWeight: 800, fontSize: 35, marginLeft: LEFT_MARGIN }}>
              {list.artistName}
            </h1>
            <div className="horizontal-scroll" style={{ paddingLeft: LEFT_MARGIN }}>
              <Row justifyContent="flex-start" style={{ padding: 0 }}>
                {list.items.map((album, i) => (
                  <Column className="album-cover" key={i} style={{ padding: 0 }}>
                    <img width={180} height={180} alt={album.name} src={album.images[0].url}/>
                    <h5>{album.name}</h5>
                  </Column>
                ))}s
              </Row>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}