import React from 'react';
import { View, ImageBackground } from 'react-native';
import styles from './styles';
import Text from '../TextWithAppFont';

export default class PlayerSwatch extends React.Component {
  render() {
    const { playerName, rightElement, swatch } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImg}
          resizeMode='contain'
          source={swatch}
        >
          <View style={styles.textDisplay}>
            <Text
              numberOfLines={1}
              style={styles.text}
            >
            {playerName}
            </Text>
          </View>
        </ImageBackground>
        {typeof rightElement === 'number' ? (
          <Text
            numberOfLines={1}
            style={styles.rightElementNum}
          >
            {rightElement}
          </Text>
        ) : (
          <View style={styles.rightElement}>{rightElement}</View>
        )}
      </View>
    );
  }
};
