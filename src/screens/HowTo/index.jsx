import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { gray999 } from '../../colors';
import Logo from '../../components/LogoHeader';
import SplashButton from '../../components/SplashButtons';
import Instructions from '../../assets/Instructions.png';
// import QuickList from '../../assets/QuickList.png';
import TeamDardz from '../../assets/TeamDardz.png';
import DrinkingDardz from '../../assets/DrinkingDardz.png';
import Images from '../../assets/Images.png';
import QuestionsAndRules from '../../assets/Questions&Rules.png';
import WatchVideo from '../../assets/WatchVideo.png';
import InstructionsModal from '../../components/InstructionsModal';

export default class HowTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionsOpen: false,
      instructionSet: null
    }
  }

  closeModal = () => {
    this.setState({ instructionsOpen: false });
  }

  toggleModal = instruction => {
    this.setState(() => ({
      instructionsOpen: true,
      instructionSet: instruction
    }));
  }

  render() {
    const { instructionsOpen } = this.state;
    return (
      <View style={styles.container}>
        <Logo
          containerStyles={styles.logoContainer}
          imgStyles={styles.logoImg}
        />
        <SplashButton
          asset={Instructions}
          onPress={() => this.toggleModal('instructions')}
        />
        {/* <SplashButton
          asset={QuickList}
          onPress={() => this.toggleModal('quickList')}
        /> */}
        <SplashButton
          asset={QuestionsAndRules}
          onPress={() => this.toggleModal('questionsAndRules')}
        />
        <SplashButton
          asset={Images}
          // onPress={() => this.props.navigation.navigate('GameSetupImages')}
          onPress={() => this.toggleModal('imagesOnly')}
        />
        <SplashButton
          asset={TeamDardz}
          onPress={() => this.toggleModal('teamDardz')}
        />
        <SplashButton
          asset={DrinkingDardz}
          onPress={() => this.toggleModal('drinkingDardz')}
        />
        <SplashButton
          asset={WatchVideo}
          // onPress={() => this.props.navigation.navigate('VideoPlayer')}
          onPress={() => {
            Linking.openURL('https://www.youtube.com/embed/xO1bLOgwO04?rel=0&autoplay=0&showinfo=0&controls=0')
          }}
        />
        <InstructionsModal
          instructionsOpen={instructionsOpen}
          instructionSet={this.state.instructionSet}
          closeModal={this.closeModal}
          toggleModal={this.toggleModal}
      />
        <View style={styles.backChev}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 60,
    height: 140
  },
  logoImg: {
    flex: 1,
    width: 220,
    height: undefined
  },
  backChev: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    maxHeight: 250,
    bottom: 20,
    left: 20,
  }
});
