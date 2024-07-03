import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const IconButton = ({iconComponent, text, onPress, marginLeft = 10}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {iconComponent}
      <Text style={[styles.text, {marginLeft}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  text: {
    fontFamily: 'Pacifico-Regular',
    color: '#ece6d3',
    fontSize: 19,
  },
});

export default IconButton;
