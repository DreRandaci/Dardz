import React from 'react';
import {
  ScrollView,
  Modal,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { gray999 } from '../../colors';
import {
  Instructions,
  QuickList,
  QuestionsAndRules,
  TeamDardz,
  DrinkingDardz,
  GameSetupImages
} from '../Instructions';

const InstructionsModal = ({
  instructionsOpen, closeModal, instructionSet, toggleModal }) => {
  return (
    <Modal
      animationType='fade'
      transparent={false}
      visible={instructionsOpen}
    >
      <ScrollView
        style={{ padding: 30 }}
        minimumZoomScale={1}
        maximumZoomScale={5}
      >
        <View style={{ marginBottom: 60, marginTop: 30 }}>
          {instructionSet === 'instructions' &&
          /*
            NOTE: this is prop drilling weirdness. Send the toggleModal function down and there will be a check if specifically the <Instructions> component fired it, requesting the "images" modal be shown. See the `instructionsSet` check below.
          */
            <Instructions toggleModal={toggleModal} />
          }
          {instructionSet === 'quickList' &&
            <QuickList />
          }
          {instructionSet === 'questionsAndRules' &&
            <QuestionsAndRules />
          }
          {instructionSet === 'teamDardz' &&
            <TeamDardz />
          }
          {instructionSet === 'drinkingDardz' &&
            <DrinkingDardz />
          }
          {instructionSet === 'images' &&
            <GameSetupImages />
          }
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          if (instructionSet === 'images') {
            toggleModal('instructions')
          } else {
            closeModal();
          }
        }}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 30,
          alignSelf: 'flex-end'
        }}>
        <Icon name="x" type="feather" color={gray999} size={40} />
      </TouchableOpacity>
    </Modal>
  );
};

export default InstructionsModal;
