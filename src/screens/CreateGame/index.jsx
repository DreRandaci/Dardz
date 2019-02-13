import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { appContainer, Subscribe } from '../../contexts';
import { GameRecord } from '../../feathers/records';
import BottomButtons from '../../components/BottomNavButtons';
import Autocomplete from '../../components/Autocomplete';
import PlayerSwatch from '../../components/PlayerSwatch';
import Logo from '../../components/LogoHeader';

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionsOpen: false,
      usedSwatchIds: [],
      game: new GameRecord(),
      playerNameSearch: '',
      // savedPlayers is mutated throughout the filtering flow
      savedPlayers: [],
      searchingSavedPlayers: false
    }
    // _savedPlayers is complete list of saved players for resetting
    this._savedPlayers = [];
  }

  componentDidMount = () => {
    const { DatabaseConnection } = appContainer;
    DatabaseConnection.transaction(trans => {
      trans.executeSql('SELECT * From Player', null, (webSql, { rows }) => {
        this._savedPlayers = rows._array;
        this.setState({ savedPlayers: rows._array });
      });
    }, (err) => console.log(err));
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.repeatGame) {
      const { game } = this.state;
      const { players } = nextProps;
      const repeatPlayers = players.map(player => (
        {
          ...player,
          Score: 0
        })
      );
      const repeatGame = game.set('players', repeatPlayers);
      this.setState({ game: repeatGame });
    }
  }

  getRandomSwatch = () => {
    // Recursively generate a random swatch color for new player names
    const { usedSwatchIds } = this.state;
    const randomNum = Math.floor(Math.random() * 8);
    const swatchIsUsed = usedSwatchIds.includes(randomNum);
    if (!swatchIsUsed) {
      const swatch = this.props.swatches.find(swa => swa.id === randomNum);
      this.setState(() => ({ usedSwatchIds: [...usedSwatchIds, swatch.id] }));
      return swatch;
    } else {
      return this.getRandomSwatch()
    }
  }

  removePlayer = (player) => {
    const { game } = this.state;
    const updatedPlayers = game.players.filter(
      _player => player.PlayerName !== _player.PlayerName
    );
    if (player.PlayerID) {
      // If this is a saved player, add them back to the list on state
      this.setState(() => ({
        game: game.updateIn(
          ['players'], () => updatedPlayers
        ),
        savedPlayers: [...this.state.savedPlayers, player]
      }));
    } else {
      this.setState(() => ({
        game: game.updateIn(
          ['players'], () => updatedPlayers
        )
      }));
    }
  };

  createGame = () => {
    appContainer.set('game', this.state.game);
    this.props.navigation.navigate('ScoreBoard');
  };

  toggleModal = () => {
    this.setState({ instructionsOpen: !this.state.instructionsOpen });
  };

  addNewPlayer = (newPlayer) => {
    const { game } = this.state;
    const defaults = {
      Swatch: this.getRandomSwatch(),
      Score: 0
    };
    // Create the standard player object based off of a new or existing player
    const player = typeof newPlayer === 'string'
      ? new Object({
        PlayerName: newPlayer.toUpperCase(),
        IsUser: 0,
        ...defaults
      })
      : new Object({
        PlayerName: newPlayer.PlayerName.toUpperCase(),
        ...defaults,
        ...newPlayer
      })
    this.setState({
      game: game.updateIn(
        ['players'], arr => arr.concat([player])
      ),
      newPlayer: '',
      playerNameExists: false,
      searchingSavedPlayers: false
    });
  };

  filterSavedPlayers = (search) => {
    const { game } = this.state;
    if (search !== '') {
      if (game.players.toJS().length) {
        const gamePlayers = this._savedPlayers.filter(player => {
          return !game.players.map(p => p.PlayerName).includes(player.PlayerName)
        });
        const currentFilteredPlayers = gamePlayers.filter(player => (
          player.PlayerName.indexOf(search.toUpperCase()) > -1
        ));
        this.setState({
          savedPlayers: currentFilteredPlayers,
          searchingSavedPlayers: true
        });
      } else {
        const filteredPlayers =
          this._savedPlayers.filter(player => {
            return player.PlayerName.indexOf(search.toUpperCase()) > -1
          });
        this.setState({
          savedPlayers: filteredPlayers,
          searchingSavedPlayers: true
        });
      }
    } else {
      const gamePlayers = this._savedPlayers.filter(player => {
          return !game.players.map(p => p.PlayerName).includes(player.PlayerName)
        }
      );
      const currentFilteredPlayers = gamePlayers.filter(player => (
        player.PlayerName.indexOf(search.toUpperCase()) > -1
      ));
      this.setState({
        savedPlayers: currentFilteredPlayers,
        searchingSavedPlayers: false
      });
    }
  };

  removePlayerFromSuggestions = (playerID) => {
    const filteredPlayers = this.state.savedPlayers.filter(player => (
      player.PlayerID !== playerID
    ));
    this.setState({
      savedPlayers: filteredPlayers,
      searchingSavedPlayers: false
    });
  };

  render() {
    const { instructionsOpen, game, searchingSavedPlayers } = this.state;
    const RemovePlayerIcon = ({ player }) => (
      <TouchableOpacity onPress={() => this.removePlayer(player)}>
        <Icon type="entypo" name="cross" color="#fff" size={32} />
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='always'
        >
          <Logo
            containerStyles={styles.logoContainer}
            imgStyles={styles.logoImg}
          />
          <KeyboardAwareScrollView style={styles.playersContainer}>
            {game.players.toJS().map((player, index) => (
              <View key={`playerSwatch-${index}`}>
                <PlayerSwatch
                  playerName={player.PlayerName}
                  rightElement={<RemovePlayerIcon player={player} />}
                  swatch={player.Swatch.swatch}
                />
              </View>
            ))}
            {game.players.size < 8 &&
              <View>
                  <Autocomplete
                    game={game}
                    addNewPlayer={this.addNewPlayer}
                    data={this.state.savedPlayers}
                    filterSavedPlayers={this.filterSavedPlayers}
                    removePlayerFromSuggestions={this.removePlayerFromSuggestions}
                  />
              </View>
            }
            <View style={styles.buttonContainer}>
              {(game.players.size > 1 && !searchingSavedPlayers) &&
                <TouchableOpacity onPress={this.createGame}>
                  <PlayerSwatch
                    playerName="START GAME"
                    swatch={this.props.swatches[5].swatch}
                    rightElement={
                      <Icon
                        type="entypo"
                        name="arrow-with-circle-right"
                        color="#fff"
                      />
                    }
                  />
                </TouchableOpacity>
              }
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        <BottomButtons
          navigation={this.props.navigation}
          endGame={() => this.props.navigation.goBack()}
          instructionsOpen={instructionsOpen}
          toggleModal={this.toggleModal}
        />
      </View>
    );
  }
}

export default (props) => {
  const repeatGame = props.navigation.getParam('repeatGame', false);
  return (
    <Subscribe
      to={[appContainer]}
      render={app => {
        return (
          <CreateGame
            {...props}
            players={app.state.getIn(['game', 'players'])}
            swatches={app.state.get('swatches')}
            repeatGame={repeatGame}
          />
        );
      }}
    />
  );
};
