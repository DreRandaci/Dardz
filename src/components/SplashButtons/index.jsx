import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
/**
 * This component renders the buttons on the first screen  screen
 */
export default SplashButton = ({ onPress, asset }) => {
  const buttonStyles = {
    containerStyles: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 25,
      height: 75
    },
    imgStyles: {
      flex: 1,
      width: 200,
      height: undefined
    }
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={buttonStyles.containerStyles}>
        <Image style={buttonStyles.imgStyles} source={asset} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};
