import React from 'react';
import { TouchableHighlight } from 'react-native';
import Text from '../TextWithAppFont';

export const CalcButton = ({ value, onPress, highlight, styles }) => (
  <TouchableHighlight
    style={[
      styles.inputButton,
      highlight ? styles.inputButtonHighlighted : null,
      value === 'C' ? { backgroundColor: '#D67867' } : null,
      value === '=' ? { backgroundColor: '#699DAF' } : null,
    ]}
    underlayColor="#193441"
    onPress={onPress}
  >
    <Text fontSize={34} style={styles.inputButtonText}>{value}</Text>
  </TouchableHighlight>
);
