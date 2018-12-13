import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';
import { Input, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { appContainer, Subscribe } from '../../contexts';
import { GameRecord } from '../../feathers/records';
import BottomButtons from '../../components/BottomNavButtons';
import PlayerSwatch from '../../components/PlayerSwatch';
import Logo from '../../components/LogoHeader';
import { gray999 } from '../../colors';

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayer: '',
      playerNameExists: false,
      instructionsOpen: false,
      usedSwatchIds: [],
      game: new GameRecord()
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.repeatGame) {
      const { game } = this.state;
      const { players } = nextProps;
      const resetPlayers = players.map(player => (
        {
          ...player,
          score: 0
        })
      );
      const resetGame = game.set('players', resetPlayers);
      this.setState({ game: resetGame });
    }
  }

  addNewPlayer = () => {
    const { newPlayer, game } = this.state;
    if (game.players.size <= 8) {
      const playerNameExists = game.players
        .toJS()
        .map(p => p.name)
        .includes(newPlayer.toUpperCase());
      if (playerNameExists) {
        this.setState({ playerNameExists: true });
      } else if (newPlayer !== '') {
        const newSwatch = this.getRandomSwatch();
        const player = new Object({
          name: newPlayer.toUpperCase(),
          swatch: newSwatch,
          score: 0
        });
        this.setState({
          game: this.state.game.updateIn(
            ['players'], arr => arr.concat([player])
          ),
          newPlayer: '',
          playerNameExists: false
        });
      }
    } else {
      // TODO: 8 players exist, post a message
    }
  };

  // Recursively generate a random swatch color for new player names
  getRandomSwatch = () => {
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

  removePlayer = playerName => {
    const { game } = this.state;
    const updatedPlayers = game.players.filter(
      player => player.name !== playerName
    );
    this.setState(() => ({
      game: game.updateIn(
        ['players'], () => updatedPlayers
      )
    }));
  };

  createGame = () => {
    appContainer.set('game', this.state.game);
    this.props.navigation.navigate('ScoreBoard');
  };

  toggleModal = () => {
    this.setState({ instructionsOpen: !this.state.instructionsOpen });
  }

  render() {
    if (this.props.repeatGame) {

    }
    const { instructionsOpen, game } = this.state;
    const RemovePlayerIcon = ({ player }) => (
      <TouchableOpacity onPress={() => this.removePlayer(player)}>
        <Icon type="entypo" name="cross" color="#fff" size={32} />
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Logo
            containerStyles={styles.logoContainer}
            imgStyles={styles.logoImg}
          />
          <KeyboardAwareScrollView style={styles.playersContainer}>
            {game.players.toJS().map((player, index) => (
              <View key={`playerSwatch-${index}`}>
                <PlayerSwatch
                  playerName={player.name}
                  rightElement={<RemovePlayerIcon player={player.name} />}
                  swatch={player.swatch.swatch}
                />
              </View>
            ))}
            {/*
              TODO: hide the input component or fire an alert letting the user know 8 players is the max?
            */}
            {game.players.size < 8 &&
              <View style={styles.inputContainer}>
                <Input
                  placeholder='+ ADD PLAYER'
                  placeholderTextColor={gray999}
                  autoCorrect={false}
                  inputStyle={{ color: '#fff' }}
                  inputContainerStyle={{ borderBottomColor: '#444' }}
                  value={this.state.newPlayer}
                  keyboardAppearance='dark'
                  onSubmitEditing={() => this.addNewPlayer()}
                  errorStyle={{ color: 'red', fontSize: 14 }}
                  errorMessage={
                    this.state.playerNameExists
                      ? 'There is already a player with that name.'
                      : null
                  }
                  onChangeText={newPlayer => { this.setState({ newPlayer }) }}
                />
              </View>
            }
            <View style={styles.buttonContainer}>
              {game.players.size > 1 &&
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
          toggleModal={() => this.toggleModal()}
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
