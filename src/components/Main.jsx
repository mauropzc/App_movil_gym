import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Pantallas
import Login from "./Login.jsx";
import Perfil from './Perfil.jsx';
import Menu from './Menu.jsx';

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