import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from './components/StartScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main'
import Home from './components/Home'
import Search from './components/Search'
import Account from './components/Account'

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name = "StartScreen"
                component = { StartScreen }
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name = "Login"
                component = { Login }
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name = "Signup"
                component = { Signup }
                options = {{
                    headerTransparent: true,
                    headerTitle: '',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen 
                name = "Main"
                component = { Main }
                options = {{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
}