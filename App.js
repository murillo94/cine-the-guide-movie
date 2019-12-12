import React from 'react';
import { Platform } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import {
  MoviesScreen,
  SearchScreen,
  ConfigurationScreen
} from './app/navigation/screens';
import ROUTES from './app/navigation/routes';

import { white, pink, blue } from './app/utils/colors';

const MoviesStack = createStackNavigator(MoviesScreen, {
  initialRouteName: ROUTES.MOVIE_LIST,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="home" size={20} color={tintColor} />
    )
  }
});

const SearchStack = createStackNavigator(SearchScreen, {
  initialRouteName: ROUTES.SEARCH,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="search" size={20} color={tintColor} />
    )
  }
});

const ConfigurationStack = createStackNavigator(ConfigurationScreen, {
  initialRouteName: ROUTES.CONFIGURATION,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="menu" size={20} color={tintColor} />
    )
  }
});

const MovieListTabBarVisible = navigation => {
  const { routes } = navigation.state;

  if (routes && routes.length > 0) {
    const route = routes[routes.length - 1];
    if (
      route.routeName === ROUTES.MOVIE_DETAILS ||
      route.routeName === ROUTES.MOVIE_VIDEO ||
      route.routeName === ROUTES.SEARCH_RESULTS
    ) {
      return false;
    }
  }

  return true;
};

const tabNavigatorDefault = {
  Movie: {
    screen: MoviesStack,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: MovieListTabBarVisible(navigation)
    })
  },
  Search: {
    screen: SearchStack,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: MovieListTabBarVisible(navigation)
    })
  },
  Config: {
    screen: ConfigurationStack
  }
};

const MainNavigator =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(tabNavigatorDefault, {
        tabBarOptions: {
          activeTintColor: pink,
          inactiveTintColor: blue,
          showIcon: true,
          labelStyle: {
            margin: 0,
            padding: 2
          },
          style: {
            backgroundColor: white
          }
        },
        animationEnabled: false,
        swipeEnabled: false
      })
    : createMaterialBottomTabNavigator(tabNavigatorDefault, {
        initialRouteName: 'Movie',
        activeTintColor: pink,
        inactiveTintColor: blue,
        shifting: true,
        barStyle: {
          backgroundColor: white,
          paddingTop: 2,
          paddingBottom: 2
        }
      });

const AppNavigator = createSwitchNavigator(
  {
    Main: MainNavigator
  },
  {
    initialRouteName: 'Main'
  }
);

export default createAppContainer(AppNavigator);
