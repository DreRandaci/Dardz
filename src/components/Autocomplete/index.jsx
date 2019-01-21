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
  }

  addNewPlayer = (newPlayer) => {
    const name = typeof newPlayer === 'string'
      ? newPlayer
      : newPlayer.PlayerName
    if (this.props.game.players.size <= 8) {
      const playerNameExists = this.props.game.players
        .toJS()
        .map(p => p.name)
        .includes(name);
      if (playerNameExists) {
        this.setState({ playerNameExists: true });
      } else if (newPlayer !== '') {
        this.props.addNewPlayer(newPlayer);
        this.setState({ newPlayer: '', playerNameExists: false });
      }
    }
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { this.addNewPlayer(item) }}>
      <ListItem
        title={item.PlayerName}
        titleStyle={{
          color: '#fff'
        }}
        containerStyle={{
          backgroundColor: '#000'
        }}
        rightIcon={<View><Text style={{color: 'white'}}>+</Text></View>}
      />
    </TouchableOpacity>
  )

  keyExtractor = (item, index) => `list-item-${index}`

  renderResultList = () => {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.data}
        renderItem={this.renderItem}
      />
    );
  }

  handleChange = (newPlayer) => {
    this.props.filterSavedPlayers(newPlayer);
    if (newPlayer === '') {
      this.setState({ playerNameExists: false });
    }
    this.setState({ newPlayer });
  }

  render() {
    const { newPlayer } = this.state;
    const { data } = this.props;
    const showResults =
      this.state.newPlayer !== ''
      && data.length
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