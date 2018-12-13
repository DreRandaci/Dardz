import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../../components/LogoHeader';
import NewGame from '../../assets/StartNewGame.png';
import HowTo from '../../assets/HowToPlay.png';
import PlayerStats from '../../assets/PlayerStats.png';
import DardzWebsite from '../../assets/DardzWebsite.png';
import SplashButton from '../../components/SplashButtons';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo
          containerStyles={styles.logoContainer}
          imgStyles={styles.logoImg}
        />
        <SplashButton
          asset={NewGame}
          onPress={() => this.props.navigation.navigate('CreateGame')}
        />
        <SplashButton
          asset={HowTo}
          onPress={() =>
            this.props.navigation.navigate('HowTo')
          }
        />
        <SplashButton
          asset={PlayerStats}
          onPress={() =>
            this.props.navigation.navigate('PlayerStats')
          }
        />
        <SplashButton
          asset={DardzWebsite}
          onPress={() =>
            // Linking.openURL('https://dardz.com/')
            //   .catch(err => console.error('An error occurred trying to open dardz.com:', err))
            this.props.navigation.navigate('DardzWebsite')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  logoContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 60
  },
  logoImg: {
    flex: 1,
    width: 220,
    height: undefined
  }
});
