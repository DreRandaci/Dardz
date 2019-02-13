import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { appContainer, Subscribe } from '../contexts';
import CreateGame from '../screens/CreateGame';
import ScoreBoard from '../screens/ScoreBoard';
import Splash from '../screens/Splash';
import HowTo from '../screens/HowTo';
import DardzWebsite from '../screens/DardzWebsite';
import VideoPlayer from '../screens/VideoPlayer';
import PlayerStats from '../screens/PlayerStats';
import Stats from '../screens/Stats';

const defaultNavOptions = {
  header: null,
  gesturesEnabled: false
};

const AppStack = createStackNavigator(
  {
    ScoreBoard: {
      screen: ScoreBoard,
      navigationOptions: {
        ...defaultNavOptions
      }
    },
    CreateGame: {
      screen: CreateGame,
      navigationOptions: {
        ...defaultNavOptions
      }
    },
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null
      }
    },
    HowTo: {
      screen: HowTo,
      navigationOptions: {
        ...defaultNavOptions
      }
    },
    PlayerStats: {
      screen: PlayerStats,
      navigationOptions: {
        header: null
      }
    },
    Stats: {
      screen: Stats,
      navigationOptions: {
        header: null
      }
    },
    DardzWebsite: {
      screen: DardzWebsite,
      navigationOptions: {
        header: null
      }
    },
    VideoPlayer: {
      screen: VideoPlayer,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Splash'
  },
  {
    headerMode: 'screen'
  }
);

export default (props) => {
  return (
    <Subscribe
      to={[appContainer]}
      render={app => {
        return (
          <AppStack {...props} {...app.state.toJS()} />
        );
      }}
    />
  );
};