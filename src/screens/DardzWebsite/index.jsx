import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class DardzWebsite extends Component {

  render() {
    return (
      <WebView
        style={{ marginTop: 20 }}
        source={{ uri: 'https://dardz.com/' }}
      />
    );
  }
}
