import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { gray999 } from '../../colors';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNameExists: false,
      newPlayer: ''
    };
  };

  addNewPlayer = (newPlayer) => {
    // `newPlayer` can be a string or a previously saved player object
    const name = typeof newPlayer === 'string'
      ? newPlayer
      : newPlayer.PlayerName
    if (this.props.game.players.size <= 8) {
      const playerNameExists = this.props.game.players
        .toJS()
        .map(p => p.PlayerName)
        .includes(name.toUpperCase());
      if (playerNameExists) {
        this.setState({ playerNameExists: true });
      } else if (newPlayer !== '') {
        this.props.addNewPlayer(newPlayer);
        this.setState({ newPlayer: '', playerNameExists: false });
      }
    }
  };

  handlePlayerAdd = (player) => {
    this.props.removePlayerFromSuggestions(player.PlayerID);
    this.addNewPlayer(player);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.handlePlayerAdd(item);
      }}
    >
      <ListItem
        title={item.PlayerName}
        titleStyle={{
          color: '#fff'
        }}
        containerStyle={{
          backgroundColor: '#000'
        }}
        rightIcon={<View><Text style={{ color: '#fff' }}>+</Text></View>}
      />
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => `list-item-${index}`

  renderResultList = () => {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.data}
        renderItem={this.renderItem}
      />
    );
  };

  handleChange = (newPlayer) => {
    if (newPlayer === '') {
      // Explicitly set playerNameExists to false to reset Input
      // errorMessage if it had fired
      this.setState({ playerNameExists: false, newPlayer });
    } else {
      this.setState({ newPlayer });
    }
    this.props.filterSavedPlayers(newPlayer);
  };

  render() {
    const { newPlayer } = this.state;
    const showResults =
      this.state.newPlayer !== ''
      && !this.state.playerNameExists;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input
            placeholder='+ ADD PLAYER'
            placeholderTextColor={gray999}
            autoCorrect={false}
            inputStyle={{ color: '#fff' }}
            inputContainerStyle={{ borderBottomColor: '#444' }}
            value={newPlayer}
            keyboardAppearance='dark'
            onSubmitEditing={() => this.addNewPlayer(newPlayer)}
            errorStyle={{ color: 'red', fontSize: 14 }}
            errorMessage={
              this.state.playerNameExists
                ? 'There is already a player with that name.'
                : null
            }
            onChangeText={newPlayer => { this.handleChange(newPlayer); }}
          />
        </View>
        <ScrollView style={styles.list}>
          {showResults && this.renderResultList()}
        </ScrollView>
      </View>
    );
  }
}

const androidStyles = {
  container: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 0
  }
};

const iosStyles = {
  container: {
    // zIndex: 1000,
  },
  inputContainer: {
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  list: {
    width: '90%',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
  }
};

const styles = StyleSheet.create({
  ...Platform.select({
    android: { ...androidStyles },
    ios: { ...iosStyles }
  })
});

export default Autocomplete;