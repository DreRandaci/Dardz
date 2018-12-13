import React, { Component } from 'react';
import { WebView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { gray999 } from '../../colors';

export default class VideoPlayer extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: '#000',
        alignContent: 'center',
        justifyContent: 'center'
      }}>
        <View style={{ height: 300 }}>
          <WebView
            // TODO: this will not work on Android
            javaScriptEnabled={true}
            style={{ flex: 1}}
            source={{ uri: 'https://www.youtube.com/embed/xO1bLOgwO04?rel=0&autoplay=0&showinfo=0&controls=0' }}
          />
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          width: '100%',
          maxHeight: 100,
          top: 180,
          left: 20
        }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon
              name="chevron-left"
              type="feather"
              color={gray999}
              size={40}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}