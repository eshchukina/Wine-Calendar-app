import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, View } from "react-native";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";



export default function App() {


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
    backgroundColor: "#c0bfb2",
  },
});