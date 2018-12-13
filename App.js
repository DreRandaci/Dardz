import React from 'react';
import { StyleSheet, ScrollView, StatusBar, AsyncStorage } from 'react-native';
import { Provider } from 'unstated';
import { Font, AppLoading, Asset } from 'expo';
import AppStack from './src/routes';
import { swatches, howToImages } from './src/assets/Swatches';
import { instructionPNGs } from './src/assets/Instruction_PNGs';
import { fonts } from './src/assets/fonts';
import { appContainer } from './src/contexts';
import createDatabase from './src/database';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    }
  }

  componentDidMount = async () => {
    try {
      /*
        See if the database tables need to be created and pass in the SQLite connection off of the appContainer
      */
      const { DatabaseConnection: connection } = appContainer;
      createDatabase(connection);

      // TODO: remove this from the appContainer
      const isFirstTimeUser = await AsyncStorage.getItem('isFirstTimeUser');
      /**
        If isFirstTimeUser = null, they are a first time user, set it accordingly on the app. Transform "null" to a bool for readability
      */
      appContainer.set('isFirstTimeUser', !isFirstTimeUser ? true : false);
      appContainer.set('swatches', swatches);
      appContainer.set('howToImages', howToImages);
      this.setState({
        isReady: true
      });
    } catch (error) {
      this.setState({
        isReady: false
      });
      console.log({ error });
    }
  }

  _loadAssetsAsync = async () => {
    try {
      return Promise.all([
        ...this._cacheImages(), Font.loadAsync(fonts)
      ]);
    } catch (err) {
      this.setState({ isReady: false });
    }
  }

  _cacheImages = () => {
    const _swatches = swatches.map(swatch => (
      Asset.fromModule(swatch.swatch).downloadAsync()
    ));
    const _howToImages = howToImages.map(img => (
      Asset.fromModule(img).downloadAsync()
    ));
    const _instructionImages = instructionPNGs.map(img => (
          Asset.fromModule(img).downloadAsync()
    ));
    return [..._swatches, ..._howToImages, ..._instructionImages];
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.error}
        />
      );
    } else {
      return (
        <Provider>
          <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="light-content" />
            <AppStack />
          </ScrollView>
        </Provider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
