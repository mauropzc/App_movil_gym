import React from "react";
import Constants from 'expo-constants'
import { View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RepositoryList from "./RepositoryList.jsx";
import { Route, Routes, Switch } from "react-router-native";

//Pantallas
import Login from "./Login.jsx";
import Perfil from './Perfil.jsx';

const Stack = createStackNavigator();

const Main = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name= "Login" component={Login} />
                <Stack.Screen name= "perfil" component={Perfil} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main