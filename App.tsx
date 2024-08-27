import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AuthStack from './src/navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import * as amplitude from '@amplitude/analytics-react-native';
import {AMPLITUDE_API_KEY} from '@env';

export default function App() {
  useEffect(() => {
    amplitude.init(AMPLITUDE_API_KEY);
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0bfb2',
  },
});