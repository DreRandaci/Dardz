import React, { Component } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  AsyncStorage } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './styles';
import { appContainer, Subscribe } from '../../contexts';
import BottomButtons from '../../components/BottomNavButtons';
import Timer from '../../components/Timer';
import TextWithAppFont from '../../components/TextWithAppFont';
import Calculator from '../../components/Calculator';
import PlayerSwatch from '../../components/PlayerSwatch';
import Logo from '../../components/LogoHeader';
import {
  InsertIntoGame,
  InsertIntoPlayer,
  InsertIntoPlayerGame
} from '../../SQLiteScripts/Inserts';

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players,
      showCalculator: false,
      playerToUpdate: {},
      instructionsOpen: false,
      // isFirstTimeUser is set on the global app state in the App entry point
      showFirstTimeUserInstructions: this.props.isFirstTimeUser
    };
  }

  confirmFirstTimeUserInstructions = async () => {
    /*
      Set whether the user has used the app before to show/hide the helper overlay on first game creation
    */
    try {
      if (this.props.isFirstTimeUser) {
        await AsyncStorage.setItem('isFirsTimeUser', JSON.stringify(false));
        // Somehow i need to update the app state and cause a rerender... or do I? it might be working
        appContainer.set('isFirstTimeUser', false);
      }
      this.setState({ showFirstTimeUserInstructions: false });
    } catch (error) {
      console.log({ error });
    }
  }

  openCalculator = player => {
    this.setState({ showCalculator: true, playerToUpdate: player });
  };

  closeCalculator = (newPlayerScore = undefined) => {
    let { playerToUpdate, players } = this.state;
    /*
      NOTE: `newPlayerScore` can equal "0", so a strict evaluation against `undefined` is required.
    */
    if (newPlayerScore !== undefined) {
      players = players.update(
        players.findIndex((player) => {
          return player.PlayerName === playerToUpdate.PlayerName;
        }), (player) => {
          player.Score = newPlayerScore;
          return player;
        }
      );
    }
    this.setState({
      showCalculator: false,
      playerToUpdate: {},
      players
    });
  };

  toggleInstructionsModal = () => {
    this.setState({ instructionsOpen: !this.state.instructionsOpen })
  }

  saveGame = () => {
    // Look at the CreateDatabase.js (schema) file for database layout
    return new Promise((resolve, reject) => {
      const { DatabaseConnection } = appContainer;
      DatabaseConnection.transaction(trans => {
        // Insert a new game record to get the new gameID
        trans.executeSql(InsertIntoGame, null, (webSql, gameResults) => {
          const { insertId: gameID } = gameResults;
          this.props.players
            // Order the players by score to determine game placement
            .sort((a, b) => b.Score - a.Score)
            .map((player, index) => {
              const playerArgs = [player.PlayerName, 0];
              /**
                If there is a player.PlayerID, pluck it off and skip ahead to add a new PlayerGame record. Otherwise, create the new player in the DB for the insertID first.
              */
              trans.executeSql(InsertIntoPlayer, playerArgs, (webSql, playerResults) => {
                const { insertId: playerID } = playerResults;
                /*
                  Because the players have been ordered by game standing,
                  placement is simply each player's index in the array + 1
                  (add 1 because of zero-based array indexing)
                */
                const place = index + 1;
                const playerGameArgs = [playerID, gameID, place];
                // Insert the PlayerGame record per player
                trans.executeSql(InsertIntoPlayerGame, playerGameArgs, (webSQL, playerGameResults) => {
                  resolve({
                    gameResults,
                    playerResults,
                    playerGameResults
                  });
                });
              });
            });
        });
      }, (err) => reject(err));
    });
  }

  endGame = () => {
    const { alert } = Alert;
    const { players } = this.props;
    const scoresExist = players.some(player => player.Score > 0);
    const splash =
    alert(
      'End Game', 'Would you like to repeat the game or start a new one?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'default'
      },
      {
        text: 'New Game',
        onPress: () => {
          if (scoresExist) {
            alert(
              'Save?', 'Would you like to save the game?', [
                {
                  text: 'Save',
                  onPress: () => {
                    this.saveGame().then(res => {
                      this.props.navigation.navigate('Splash');
                    }).catch(err => console.log(err))
                  },
                  style: 'cancel'
                },
                {
                  text: 'Don\'t Save',
                  onPress: () => {
                    this.props.navigation.navigate('Splash');
                  },
                  style: 'destructive'
                }
              ]
            )
          } else {
            this.props.navigation.navigate('Splash');
          }
        },
        style: 'destructive'
      },
      {
        text: 'Repeat Game',
        onPress: () => {
          if (scoresExist) {
            alert(
              'Save?', 'Would you like to save the game?', [
                {
                  text: 'Save',
                  onPress: () => {
                    this.saveGame().then(res => {
                      this.props.navigation.navigate(
                        'CreateGame',
                        { repeatGame: true }
                      );
                    }).catch(err => console.log(err))
                  },
                  style: 'cancel'
                },
                {
                  text: 'Don\'t Save',
                  onPress: () => {
                    this.props.navigation.navigate(
                      'CreateGame',
                      { repeatGame: true }
                    );
                  },
                  style: 'destructive'
                }
              ]
            )
          } else {
            this.props.navigation.navigate('CreateGame');
          }
        },
        style: 'cancel'
      }
    ]);
  };

  render() {
    const {
      players,
      showCalculator,
      playerToUpdate,
      instructionsOpen,
      showFirstTimeUserInstructions } = this.state;
    const greenSwatch = appContainer.state
      .get('swatches')
      .find(swa => swa.id === 1).swatch;
    if (!players) {
      return null;
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Logo
          containerStyles={styles.logoContainer}
          imgStyles={styles.logoImg}
        />
        <ScrollView style={styles.playersContainer}>
          {players.sort((a, b) => b.Score - a.Score).map((player, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => { this.openCalculator(player) }}
            >
              <PlayerSwatch
                playerName={player.PlayerName}
                rightElement={player.Score}
                swatch={player.Swatch.swatch}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <BottomButtons
          navigation={this.props.navigation}
          endGame={() => this.endGame()}
          instructionsOpen={instructionsOpen}
          toggleModal={this.toggleInstructionsModal}
        />
        <Overlay
          isVisible={showCalculator}
          overlayStyle={{ padding: 0 }}
          windowBackgroundColor='#000'
          onBackdropPress={() => this.setState({ showCalculator: false })}
        >
          <Calculator
            player={playerToUpdate}
            closeCalculator={this.closeCalculator}
          />
        </Overlay>
        {/* This overlay fires only with a new user */}
        <Overlay
          isVisible={showFirstTimeUserInstructions}
          height={275}
          overlayStyle={{ padding: 0 }}
          windowBackgroundColor='#000'
          onBackdropPress={() => this.setState({
            showFirstTimeUserInstructions: false
          })}
        >
          <View style={{ backgroundColor: '#000', alignItems: 'center',
            justifyContent: 'center', flex: 1 }}
          >
            <TextWithAppFont color='#fff'>
              Click on a players name to change their score. Use the +/- and = buttons.
            </TextWithAppFont>
            <View style={{ marginTop: 35, marginLeft: 25 }}>
              <TouchableOpacity onPress={() => {
                  this.confirmFirstTimeUserInstructions();
                }}
              >
                <PlayerSwatch
                  playerName="OK"
                  swatch={greenSwatch}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
        {!showFirstTimeUserInstructions &&
          <View style={{ marginBottom: 35 }}>
            <Timer />
          </View>
        }
      </ScrollView>
    );
  }
}

export default (props) => {
  return (
    <Subscribe
      to={[appContainer]}
      render={app => {
        return (
          <ScoreBoard
            {...props}
            players={app.state.getIn(['game', 'players'])}
            isFirstTimeUser={app.state.get('isFirstTimeUser')}
          />
        );
      }}
    />
  );
};
