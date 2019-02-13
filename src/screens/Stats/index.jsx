import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { appContainer } from '../../contexts';
import CustomText from '../../components/TextWithAppFont';
import { Bold } from '../../components/TextWithAppFont';
import { gray999 } from '../../colors';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        gamesPlayed: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
      }
    }
  }

  deletePlayer = (id) => {
    const { alert } = Alert;
    alert(
      'Delete Player', null, [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'default'
        },
        {
          text: 'Delete Player',
          onPress: () => {
            const { DatabaseConnection } = appContainer;
            DatabaseConnection.transaction(trans => {
              trans.executeSql(`
                DELETE From PlayerGame WHERE PlayerID = ?`
                , [id]
                , (webSql, { rows }) => {
                  trans.executeSql(`
                DELETE From Player WHERE PlayerID = ?`
                    , [id]
                    , (webSql, { rows }) => {});
                });
            }, (err) => console.log('ERROR DELETING PLAYER: ', err));
            const refresh = this.props.navigation.getParam('refreshPlayers');
            refresh();
            this.props.navigation.navigate('PlayerStats');
          },
          style: 'destructive'
        }
      ]);

  }

  componentDidMount = () => {
    const player = this.props.navigation.getParam('player');
    const { DatabaseConnection } = appContainer;
    DatabaseConnection.transaction(trans => {
      trans.executeSql(`
        SELECT * From PlayerGame WHERE PlayerID = ?`
        , [player.PlayerID]
        , (webSql, { rows }) => {
          rows._array.map((player) => {
            const { stats } = this.state;
            const { ScoreID } = player;
            this.setState({
              stats: {
                ...stats,
                gamesPlayed: stats.gamesPlayed + 1,
                [ScoreID]: stats[ScoreID] + 1
              }
            });
        });
      });
    }, (err) => console.log(err));
  }

  render() {
    const player = this.props.navigation.getParam('player');
    const { Color: badgeColor } = player;
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 75 }}>
          <View style={{ alignItems: 'center' }}>
            <CustomText>
              <Bold>{player.PlayerName} Stats</Bold>
            </CustomText>
          </View>
          <StyledListItem
            title={'Games Played'}
            badgeVal={this.state.stats.gamesPlayed}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'1st Place Finishes'}
            badgeVal={this.state.stats[1]}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'2nd Place Finishes'}
            badgeVal={this.state.stats[2]}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'3rd Place Finishes'}
            badgeVal={this.state.stats[3]}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'4th Place Finishes'}
            badgeVal={this.state.stats[4]}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'5th Place Finishes'}
            badgeVal={this.state.stats[5]}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'6th Place Finishes'}
            badgeVal={this.state.stats[6]}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'7th Place Finishes'}
            badgeVal={this.state.stats[7]}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'8th Place Finishes'}
            badgeVal={this.state.stats[8]}
            badgeColor={badgeColor}
          />
          <View style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: 'row',
            margin: 15,
            paddingBottom: 30
          }}>
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
            <TouchableOpacity
              onPress={() => { this.deletePlayer(player.PlayerID) }}
              style={{
                paddingTop: 10
              }}
            >
              <CustomText>
                <Bold color='#E95D4E'>DELETE PLAYER</Bold>
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const StyledListItem = ({ title, badgeVal, badgeColor }) => (
  <ListItem
    style={{
      width: Dimensions.get('window').width,
      paddingLeft: 12,
      paddingRight: 12,
    }}
    containerStyle={{
      backgroundColor: '#000'
    }}
    titleStyle={{
      color: '#fff',
      fontSize: 20
    }}
    title={title}
    badge={{
      value: badgeVal,
      textStyle: { color: '#fff', fontSize: 20 },
      containerStyle: { backgroundColor: badgeColor }
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center'
  }
});
