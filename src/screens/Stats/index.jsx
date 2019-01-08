import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { appContainer } from '../../contexts';
import CustomText from '../../components/TextWithAppFont';
import { Bold } from '../../components/TextWithAppFont';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
      sixth: 0,
      seventh: 0,
      eigth: 0
    }
  }

  componentDidMount = () => {
    const player = this.props.navigation.getParam('player');
    const { DatabaseConnection } = appContainer;
    DatabaseConnection.transaction(trans => {
      trans.executeSql(`
        SELECT * From PlayerGame WHERE PlayerID = ?`
        , [player.PlayerID]
        , (webSql, { rows }) => {
        const stats = this.state;
        rows._array.map(playerScore => {
          switch (playerScore.ScoreID) {
            case 1:
              stats.first = stats.first + 1;
              break;
            case 2:
              stats.second = stats.second + 1;
              break;
            case 3:
              stats.third = stats.third + 1;
              break;
            case 4:
              stats.fourth = stats.fourth + 1;
              break;
            case 5:
              stats.fifth = stats.fifth + 1;
              break;
            case 6:
              stats.sixth = stats.sixth + 1;
              break;
            case 7:
              stats.seventh = stats.seventh + 1;
              break;
            case 8:
              stats.eigth = stats.eigth + 1;
              break;
            default:
              break;
          }
          this.setState({...stats});
        })
      });
    }, (err) => console.log(err));
  }

  render() {
    const player = this.props.navigation.getParam('player');
    const badgeColor = this.props.navigation.getParam('color');
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
            badgeVal={player.GamesPlayed}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'1st Place Finishes'}
            badgeVal={this.state.first}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'2nd Place Finishes'}
            badgeVal={this.state.second}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'3rd Place Finishes'}
            badgeVal={this.state.third}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'4th Place Finishes'}
            badgeVal={this.state.fourth}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'5th Place Finishes'}
            badgeVal={this.state.fifth}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'6th Place Finishes'}
            badgeVal={this.state.sixth}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'7th Place Finishes'}
            badgeVal={this.state.seventh}
            badgeColor={badgeColor}
          />
          <StyledListItem
            title={'8th Place Finishes'}
            badgeVal={this.state.eigth}
            badgeColor={badgeColor}
          />
          <View style={{ alignSelf: 'center', marginTop: 40 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <CustomText>
                <Bold>BACK</Bold>
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
