import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Pantallas
import Login from "./Login.jsx";
import Perfil from './Perfil.jsx';
import Menu from './Menu.jsx';
import Forgot from './Forgot.jsx';
import Check from './Check.jsx';
import Ejercicio from "./Ejercicio.jsx";
import Physic from "./Physic.jsx";
import Profile from "./Profile.jsx";
import EditProfile from "./EditProfile.jsx";
import Food from "./Food.jsx";
import { GlobalProvider } from "../contexts/globalContext.jsx";

const Stack = createStackNavigator();

const Main = () => {
    return (
        <NavigationContainer>
            <GlobalProvider>
                <Stack.Navigator>
                    <Stack.Screen name= "Login" component={Login} />
                    <Stack.Screen name= "perfil" component={Perfil} options={{title:"Sign Up"}} />
                    <Stack.Screen name= "Forgot" component={Forgot} options={{title:"Forgot Pass"}}/>
                    <Stack.Screen name= "Check" component={Check} />
                    <Stack.Screen name= "Menu" component={Menu} />
                    <Stack.Screen name= "Ejercicio" component={Ejercicio} options={{title:"Exercises"}}/>
                    <Stack.Screen name= "Physic" component={Physic} />
                    <Stack.Screen name= "Profile" component={Profile} />
                    <Stack.Screen name= "EditProfile" component={EditProfile} />
                    <Stack.Screen name= "Food" component={Food} />
                </Stack.Navigator>
            </GlobalProvider>
        </NavigationContainer>
    )
}

export default Main