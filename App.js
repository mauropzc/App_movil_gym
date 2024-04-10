import React from 'react';
import Constants from 'expo-constants'
import { View } from 'react-native';
import Main from './src/Main.jsx'

export default function App() {
  return (
    <View style={{marginTop: Constants.statusBarHeight, flexGrow: 1}}>
      <Main />
    </View>
  );
}