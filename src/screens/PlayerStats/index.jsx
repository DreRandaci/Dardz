import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem, Icon, SearchBar } from 'react-native-elements'
import { appContainer, Subscribe } from '../../contexts';
import CustomText from '../../components/TextWithAppFont';
import { Bold } from '../../components/TextWithAppFont';
import { gray999 } from '../../colors';

class PlayerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      _players: [],
      search: ''
    }
    this._players = []
    this.colors = [
      { color: 'yellowSwatch', hex: '#FDCF85' },
      { color: 'greenSwatch', hex: '#327F60' },
      { color: 'lightBlueSwatch', hex: '#95C8E6' },
      { color: 'redSwatch', hex: '#E95D4E' },
      { color: 'pinkSwatch', hex: '#F4C6DB' },
      { color: 'purpleSwatch', hex: '#4E3C6E' },
      { color: 'orangeSwatch', hex: '#F0967B' },
      { color: 'blueSwatch', hex: '#3347B5' }
    ]
  }

  componentDidMount = () => {
    const { DatabaseConnection } = appContainer;
    DatabaseConnection.transaction(trans => {
      trans.executeSql('SELECT * From Player', null, (webSql, { rows }) => {
        this._players = rows._array;
        this.setState({ players: rows._array });
      });
    }, (err) => console.log(err));
  }

  handleTextChange = (search) => {
    const { players } = this.state;
    const filteredPlayers =
      players.filter(player => player.PlayerName.indexOf(search.toUpperCase()) > -1);
    if (filteredPlayers.length) {
      this.setState({ players: filteredPlayers, search });
    }
  }

  handleClear = () => {
    // TODO: this method isnt firing. could be a bug with React Native elements searchbar
    console.log('clear')
    this.setState({ players: this._players, search: '' });
  };


  render() {
    const { players } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
          backgroundColor: '#000',
          flex: 1,
          marginTop: 10
          }}
        >
          {players.length && (
            <SearchBar
              searchIcon={{ size: 24 }}
              containerStyle={{
                marginTop: 50,
                paddingLeft: 50,
                paddingRight: 50,
                backgroundColor: '#000'
              }}
              autoCorrect={false}
              onChangeText={this.handleTextChange}
              // clearIcon={null}
              onClear={this.handleClear}
              value={this.state.search}
              // clearButtonMode='always'
              placeholder='Search'
            />)}
          {players.length ? (
            players.map((player, index) => {
              const randomNum = Math.floor(Math.random() * 8);
              const color = this.colors[randomNum].hex;
              return (
                <TouchableOpacity key={index} onPress={() => {
                  this.props.navigation.navigate('Stats', { player, color });
                }}>
                  <ListItem
                    style={{
                      width: Dimensions.get('window').width,
                      paddingLeft: 50,
                      paddingRight: 50,
                      paddingTop: 12,
                    }}
                    containerStyle={{
                      backgroundColor: color,
                    }}
                    titleStyle={{
                      color: '#fff',
                      fontSize: 20
                    }}
                    key={index}
                    title={player.PlayerName}
                    chevron
                  />
                </TouchableOpacity>
              )
          })) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View style={{ paddingLeft: 50, paddingRight: 50 }}>
                <CustomText>
                  <Bold>No player stats! Create a new game, play, and save it at the end to keep track of player scores.</Bold>
                </CustomText>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={{ alignSelf: 'flex-start', margin: 15 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon
              name="chevron-left"
              type="feather"
              color={gray999}
              size={40}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default (props) => {
  return (
    <Subscribe
      to={[appContainer]}
      render={app => {
        return (
          <PlayerStats
            {...props}
            players={app.state.getIn(['game', 'players'])}
          />
        );
      }}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
