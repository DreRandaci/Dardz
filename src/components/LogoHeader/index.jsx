import React from 'react';
import { View, Image } from 'react-native';
import LogoImage from '../../assets/Logo.png';

export default LogoHeader = ({ containerStyles, imgStyles }) => {
  return (
    <View style={containerStyles}>
      <Image style={imgStyles} source={LogoImage} resizeMode="contain" />
    </View>
  );
};
