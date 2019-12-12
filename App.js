import React from 'react';
import { Platform } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import MovieList from './app/screens/MovieList';
import Configuration from './app/screens/Configuration';
import MovieDetails from './app/screens/MovieDetails';
import Search from './app/screens/Search';
import MovieVideo from './app/screens/MovieVideo';

import { darkBlue, white, pink, blue } from './app/utils/colors';

const titleMovieTab = 'Home';
const titleSearchTab = 'Search';
const titleConfigTab = 'More';

const navigationOptions = {
  headerTintColor: darkBlue,
  headerStyle: {
    backgroundColor: white
  }
};

const MoviesTab = createStackNavigator(
  {
    MovieList: {
      screen: MovieList,
      navigationOptions: {
        ...navigationOptions,
        title: titleMovieTab
      }
    },
    MovieDetails: {
      screen: MovieDetails,
      navigationOptions
    },
    MovieVideo: {
      screen: MovieVideo,
      navigationOptions
    }
  },
  {
    initialRouteName: 'MovieList'
  }
);

MoviesTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="home" size={20} color={tintColor} />
  )
};

const SearchTab = createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        ...navigationOptions,
        title: titleSearchTab
      }
    },
    SearchResults: {
      screen: MovieList,
      navigationOptions
    },
    MovieDetails: {
      screen: MovieDetails,
      navigationOptions
    },
    MovieVideo: {
      screen: MovieVideo,
      navigationOptions
    }
  },
  {
    initialRouteName: 'Search'
  }
);

SearchTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="search" size={20} color={tintColor} />
  )
};

const ConfigurationTab = createStackNavigator(
  {
    Configuration: {
      screen: Configuration,
      navigationOptions: {
        ...navigationOptions,
        title: titleConfigTab
      }
    }
  },
  {
    initialRouteName: 'Configuration'
  }
);

ConfigurationTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="menu" size={20} color={tintColor} />
  )
};

const MovieListTabBarVisible = navigation => {
  const { routes } = navigation.state;

  if (routes && routes.length > 0) {
    const route = routes[routes.length - 1];
    if (
      route.routeName === 'MovieDetails' ||
      route.routeName === 'MovieVideo' ||
      route.routeName === 'SearchResults'
    ) {
      return false;
    }
  }

  return true;
};

const tabNavigatorDefault = {
  Movie: {
    screen: MoviesTab,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: MovieListTabBarVisible(navigation)
    })
  },
  Search: {
    screen: SearchTab,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: MovieListTabBarVisible(navigation)
    })
  },
  Config: {
    screen: ConfigurationTab
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
