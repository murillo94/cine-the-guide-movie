import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Host } from 'react-native-portalize';

import {
  MoviesStackScreen,
  SearchStackScreen,
  ConfigurationStackScreen
} from './screens';
import { ROUTES, TABS } from './routes';

import { darkBlue, white, pink, blue } from '../utils/colors';

enableScreens();

const defaultNavigationOptions = {
  headerTintColor: darkBlue,
  headerStyle: {
    backgroundColor: white
  }
};

const Tab = createBottomTabNavigator();
const TabsConfig = {
  tabBarOptions: {
    activeTintColor: pink,
    inactiveTintColor: blue,
    labelStyle: {
      margin: 0,
      padding: 1
    },
    style: {
      backgroundColor: white
    }
  }
};

const AppNavigator = () => (
  <NavigationContainer>
    <Host>
      <Tab.Navigator initialRouteName={ROUTES.MOVIE_LIST} {...TabsConfig}>
        <Tab.Screen
          name={TABS.HOME}
          component={MoviesStackScreen}
          options={{
            ...defaultNavigationOptions,
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={20} color={color} />
            )
          }}
        />
        <Tab.Screen
          name={TABS.SEARCH}
          component={SearchStackScreen}
          options={{
            ...defaultNavigationOptions,
            tabBarIcon: ({ color }) => (
              <Feather name="search" size={20} color={color} />
            )
          }}
        />
        <Tab.Screen
          name={TABS.CONFIGURATION}
          component={ConfigurationStackScreen}
          options={{
            ...defaultNavigationOptions,
            tabBarIcon: ({ color }) => (
              <Feather name="menu" size={20} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </Host>
  </NavigationContainer>
);

export default AppNavigator;
