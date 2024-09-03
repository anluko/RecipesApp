import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionics from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './Home';
import Search from './Search';
import Account from './Account';
import Recipe from './UserRecipes';
import RecipeInfo from './RecipeInfo';
import RecipeListItem from './RecipeListItem';


const Tab = createBottomTabNavigator();
const RecipeTab = createStackNavigator();

function RecipeStackScreen({ navigation, route }) {
  return (
    <RecipeTab.Navigator>
      <RecipeTab.Screen
        name = "Список рецептов"
        component = { Recipe }
        initialParams = { route.params }
        options = {{
          headerShown: false
        }}>
      </RecipeTab.Screen>
      <RecipeTab.Screen
        name = "Лист рецепта"
        component = { RecipeListItem }
        options = {{
          headerShown: false
        }}>
      </RecipeTab.Screen>
      <RecipeTab.Screen
        name = "Про рецепт"
        component = { RecipeInfo }
        options = {{
          headerShown: false
        }}>
      </RecipeTab.Screen>
    </RecipeTab.Navigator>
  )
}

export default function Main({ navigation, route }) {
  return ( 
      <Tab.Navigator 
        initialRouteName = { 'Home' }
        screenOptions = { ({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let IconComponent;

            if (route.name === 'Поиск') {
              IconComponent = Ionics;
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Рецепты') { 
              IconComponent = Ionics;
              iconName = focused ? 'bookmarks' : 'bookmarks-outline';
            } else  if (route.name === 'Главная') {
              IconComponent = MaterialIcon;
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Аккаунт') {
              IconComponent = MaterialIcon;
              iconName = focused ? 'account' : 'account-outline';
            } 

            return <IconComponent name = {iconName} size = {28} color = {color} /> 
          },
          tabBarStyle: {
            backgroundColor: '#cacce8',
            borderWidth: 0.5,
            borderColor: '#3d49eb',
            paddingBottom: 5, 
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: 'mw-bold'
          },
          tabBarActiveTintColor: '#5258f2', 
          tabBarInactiveTintColor: '#676985',
        })}
      >
          <Tab.Screen 
            name = { 'Главная' } 
            component = { Home } 
            initialParams = { route.params }
            options = {{
              headerShown: false
          }}/>
          <Tab.Screen 
            name = { 'Поиск' } 
            component = { Search }
            options = {{
              headerShown: false
          }}/>
          <Tab.Screen 
            name = { 'Рецепты' } 
            component = { RecipeStackScreen }
            initialParams = { route.params }
            options = {{
              headerShown: false
          }}/>
          <Tab.Screen 
            name = { 'Аккаунт' } 
            component = { Account }
            initialParams = { route.params }
            options = {{
              headerShown: false
          }}/>
      </Tab.Navigator>
  )
}