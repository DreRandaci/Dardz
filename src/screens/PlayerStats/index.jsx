import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { appContainer, Subscribe } from '../../contexts';
import CustomText from '../../components/TextWithAppFont';
import { Bold } from '../../components/TextWithAppFont';

class PlayerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
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
        this.setState({ players: rows._array });
      });
    }, (err) => console.log(err));
  }

  render() {
    const { players } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{
          backgroundColor: '#000',
          flex: 1,
          marginTop: 50
        }}>
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
            <View>
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <CustomText>
                  <Bold>No player stats! Create a new game, play, and save it at the end to keep track of all-time scores.</Bold>
                </CustomText>
              </View>
              <View style={{ marginTop: 40 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <CustomText>
                    <Bold>Main Menu</Bold>
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
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
