import React from 'react';
import Constants from 'expo-constants'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main.jsx'


export default function App() {
  return (
    <View style={{marginTop: Constants.statusBarHeight, flexGrow: 1}}>
      <Main />
    </View>
  );
}