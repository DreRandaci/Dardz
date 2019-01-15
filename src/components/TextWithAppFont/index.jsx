import React from 'react';
import { Text } from 'react-native';

/*
  I created separate components for Bold, Italic, Br, etc. rather than passing those as props to the regular React Native Text API for readability throughout the instructions markup. They read and act similarly to HTML <span> tags.
*/

export default TextWithAppFont = ({ style, fontFamily, color, fontSize, ...props })=> (
  <Text
    {...props}
    style={[style, { fontFamily, color, fontSize }]}
  >
    {props.children}
  </Text>
);

export const Bold = (props) => (
  <Text
    {...props}
    style={{
      fontFamily: 'Radikal-Bold',
      fontSize: props.fontSize || 20
    }}
  >
    {props.children}{' '}
  </Text>
);

export const BoldItalic = (props) => (
  <Text
    {...props}
    style={{
      fontFamily: 'Radikal-Bold-Italic',
      fontSize: props.fontSize || 20
    }}
  >
    {props.children}
  </Text>
);

export const Italic = (props) => (
  <Text
    {...props}
    style={{
      fontFamily: 'Radikal-Italic',
      fontSize: props.fontSize || 20
  }}
  >
    {props.children}{' '}
  </Text>
);

export const Br = () => ("\n")

TextWithAppFont.defaultProps = {
  fontFamily: 'Radikal',
  fontSize: 24
}