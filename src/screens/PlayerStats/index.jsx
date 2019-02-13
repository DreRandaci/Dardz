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
      search: '',
      playersLoaded: false
    };
    this._players = [];
    this.colors = [
      { color: 'yellowSwatch', hex: '#FDCF85' },
      { color: 'greenSwatch', hex: '#327F60' },
      { color: 'lightBlueSwatch', hex: '#95C8E6' },
      { color: 'redSwatch', hex: '#E95D4E' },
      { color: 'pinkSwatch', hex: '#F4C6DB' },
      { color: 'purpleSwatch', hex: '#4E3C6E' },
      { color: 'orangeSwatch', hex: '#F0967B' },
      { color: 'blueSwatch', hex: '#3347B5' }
    ];
  }

  componentDidMount = () => {
    this.getPlayers();
  }

  handleTextChange = (search) => {
    if (search !== '') {
      const { players } = this.state;
      const filteredPlayers =
        players.filter(player => player.PlayerName.indexOf(search.toUpperCase()) > -1);
      if (filteredPlayers.length) {
        this.setState({ players: filteredPlayers, search });
      }
    } else {
      this.setState({ players: this._players });
    }
  }

  getPlayers = () => {
    const { DatabaseConnection } = appContainer;
    DatabaseConnection.transaction(trans => {
      trans.executeSql('SELECT * From Player', null, (webSql, { rows }) => {
        const playersWithColors = rows._array.map(player => {
          const randomNum = Math.floor(Math.random() * 8);
          const color = this.colors[randomNum].hex;
          const playerObj = {
            ...player,
            Color: color
          }
          return playerObj
        });
        this._players = playersWithColors;
        this.setState({ players: playersWithColors, playersLoaded: true });
      });
    }, (err) => console.log(err));
  }

  createPlayerList = (players) => {
    return players.sort((a, b) => {
      if (a.PlayerName < b.PlayerName) { return -1; }
      if (a.PlayerName > b.PlayerName) { return 1; }
      return 0;
    }).map((player, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => {
          this.props.navigation.navigate('Stats',
            { player, refreshPlayers: this.getPlayers }
          );
        }}>
          <ListItem
            style={{
              width: Dimensions.get('window').width,
              paddingLeft: 50,
              paddingRight: 50,
              paddingTop: 12,
            }}
            containerStyle={{
              backgroundColor: '#000',
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
    })
  }

  render() {
    const { players, playersLoaded } = this.state;
    if (!playersLoaded) { return (
      <View style={{
        height: Dimensions.get('window').height,
        backgroundColor: '#000',
        width: Dimensions.get('window').width
      }}>
      </View>
      )
    }
    return (
      <View style={styles.container}>
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
              clearIcon={null}
              value={this.state.search}
              clearButtonMode='always'
              placeholder='Search'
            />)}
          {players.length ? (
            <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: '#000',
                marginTop: 10
              }}
            >
              {this.createPlayerList(players)}
            </ScrollView>
            </View>
          ) : (
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
