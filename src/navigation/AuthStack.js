import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';
import HomeScreen from '../screens/Home';
import Calendar from '../calendar/Calendar';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={Calendar} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStack;
