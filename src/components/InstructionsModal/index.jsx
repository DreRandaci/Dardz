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
  DrinkingDardz
} from '../../assets/Instructions';

const InstructionsModal = ({
  instructionsOpen, closeModal, instructionSet }) => {
  return (
    <Modal
      animationType='fade'
      transparent={false}
      visible={instructionsOpen}
    >
      <ScrollView
        style={{ padding: 30, backgroundColor: '#000' }}
        minimumZoomScale={1}
        maximumZoomScale={5}
      >
        <View style={{ marginBottom: 60, marginTop: 30 }}>
          {instructionSet === 'instructions' &&
            <Instructions />
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
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={closeModal}
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
