import React from 'react';
import {View, StyleSheet} from 'react-native';

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: '#c0bfb2',
    borderBottomWidth: 2,
    width: '100%',
    marginVertical: 10,
  },
});

export default HorizontalLine;
