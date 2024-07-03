import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({text, padding, color, onPress, paddingLeft, paddingRight}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          padding: padding,
          backgroundColor: color,
          paddingLeft: paddingLeft,
          paddingRight: paddingRight,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
  text: {
    color: '#ece6d3',
    textAlign: 'center',
    fontFamily: 'Philosopher-Regular',
    fontSize: 20,
  },
});

export default Button;
