import React, { Component } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Dimensions } from 'react-native';
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
} from '../../database/Inserts';

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players,
      showCalculator: false,
      playerToUpdate: {},
      instructionsOpen: false,
      // isFirstTimeUser is set on the global app state in the App entry point
      // showFirstTimeUserInstructions: this.props.isFirstTimeUser
      showFirstTimeUserInstructions: false
    };
  }

  componentDidMount = () => {
    const { DatabaseConnection } = appContainer;
    DatabaseConnection.transaction(trans => {
      trans.executeSql('SELECT * From User', null, (webSql, { rows }) => {
        const { IsFirstTimeUser } = rows._array[0];
        this.setState({
          showFirstTimeUserInstructions: IsFirstTimeUser === 1 ? true : false
        })
      });
    }, (err) => console.log(err));
  }

  confirmFirstTimeUserInstructions = async () => {
    /*
      Set whether the user has used the app before to show/hide the helper overlay on first game creation
    */
    const { DatabaseConnection } = appContainer;
    DatabaseConnection.transaction(trans => {
      trans.executeSql('UPDATE User SET IsFirstTimeUser = 0', null, (webSql, { rows }) => {
        this.setState({
          showFirstTimeUserInstructions: false
        });
      });
    }, (err) => console.log(err));
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
    const { players } = this.props;
    const numOfPlayers = players.size;
    return new Promise((resolve, reject) => {
      const { DatabaseConnection } = appContainer;
      DatabaseConnection.transaction(trans => {
        // Insert a new game record to get the gameID
        trans.executeSql(InsertIntoGame, [numOfPlayers],
          (webSql, gameResults) => {
          const { insertId: gameID } = gameResults;
          // Order the players by score to determine game placement. A 0 index in the array = 1st place, 1 index = 2nd place, etc.
          const sortedPlayers = players.sort((a, b) => {
              return b.Score - a.Score;
            });
            sortedPlayers.map((player, index) => {
              const place = index + 1;
              /*
                Check if there is a player.PlayerID and determine if the player needs to be created in the db first
              */
              const _playerId = player.PlayerID ? player.PlayerID : null
              if (!_playerId) {
                const playerArgs = [_playerId, player.PlayerName, 0];
                trans.executeSql(InsertIntoPlayer, playerArgs, (webSql, playerResults) => {
                  const { insertId: newPlayerID } = playerResults;
                  const playerGameArgs = [
                    newPlayerID, gameID, place, player.Score
                  ];
                  // Insert the PlayerGame record with the new playerID
                  trans.executeSql(InsertIntoPlayerGame, playerGameArgs, (webSQL, playerGameResults) => {
                    resolve({
                      gameResults,
                      playerResults,
                      playerGameResults
                    });
                  });
                }, (err) => console.log('InsertIntoPlayer ERROR:', err));
              } else {
                const playerGameArgs = [_playerId, gameID, place, player.Score];
                // Insert the PlayerGame record with the existing _playerId
                trans.executeSql(InsertIntoPlayerGame, playerGameArgs, (webSQL, playerGameResults) => {
                  resolve({
                    gameResults,
                    playerGameResults
                  });
                }, (err) => console.log('InsertIntoPlayerGame ERROR:', err));
              }
            });
          }, (err) => console.log('InsertIntoGame ERROR:', err));
      }, (err) => reject(err));
    });
  }

  endGame = () => {
    const { alert } = Alert;
    const { players } = this.props;
    const scoresExist = players.some(player => player.Score > 0);
    alert(
      'End Game', null, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'default'
      },
      {
        text: 'End Game',
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
          width={Dimensions.get('screen').width - 25}
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
          onBackdropPress={() => {
            this.setState({
              showFirstTimeUserInstructions: false
            });
          }}
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
        {/* {!showFirstTimeUserInstructions && */}
          <View style={{ marginBottom: 35 }}>
            <Timer />
          </View>
        // }
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
