import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { gray999 } from '../../colors';
import Text from '../TextWithAppFont';
import InstructionsModal from '../InstructionsModal';
import Timer from '../Timer';

class BottomButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { instructionsOpen, toggleModal, endGame, navigation } = this.props;
    return (
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('HowTo')}>
          <Icon
            name="help-circle"
            type="feather"
            color={gray999}
            size={40}
            />
          <Text
            style={styles.backButtonText}
            color={gray999}
            fontSize={10}
          >
            HOW TO PLAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={endGame}>
          <Icon name="x" type="feather" color={gray999} size={40} />
          <Text
            style={styles.backButtonText}
            color={gray999}
            fontSize={10}
          >
            END GAME
          </Text>
        </TouchableOpacity>
        {instructionsOpen &&
          <InstructionsModal
            instructionsOpen={instructionsOpen}
            closeModal={() => toggleModal()}
          />
        }
      </View>
    );
  };
};

const styles = StyleSheet.create({
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    padding: 24,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000',
  },
  backButtonText: {
    paddingTop: 8,
    textAlign: 'center'
  }
});

export default BottomButtons;
