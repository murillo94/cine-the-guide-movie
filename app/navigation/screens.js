import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MovieList from '../screens/MovieList';
import Configuration from '../screens/Configuration';
import MovieDetails from '../screens/MovieDetails';
import Search from '../screens/Search';
import MovieVideo from '../screens/MovieVideo';

import { ROUTES, TABS } from './routes';

const HomeStack = createStackNavigator();
export const MoviesStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name={ROUTES.MOVIE_LIST}
      component={MovieList}
      options={{
        title: TABS.HOME
      }}
    />
    <HomeStack.Screen
      name={ROUTES.MOVIE_DETAILS}
      component={MovieDetails}
      options={({ route }) => {
        const { title } = route.params || {};

        return {
          title
        };
      }}
    />
    <HomeStack.Screen
      name={ROUTES.MOVIE_VIDEO}
      component={MovieVideo}
      options={{ title: 'Trailer' }}
    />
  </HomeStack.Navigator>
);

const SearchStack = createStackNavigator();
export const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name={ROUTES.SEARCH}
      component={Search}
      options={{ title: TABS.SEARCH }}
    />
    <SearchStack.Screen
      name={ROUTES.SEARCH_RESULTS}
      component={MovieList}
      options={{ title: 'Search results' }}
    />
    <SearchStack.Screen
      name={ROUTES.MOVIE_DETAILS}
      component={MovieDetails}
      options={({ route }) => {
        const { title } = route.params || {};

        return {
          title
        };
      }}
    />
    <SearchStack.Screen
      name={ROUTES.MOVIE_VIDEO}
      component={MovieVideo}
      options={{ title: 'Trailer' }}
    />
  </SearchStack.Navigator>
);

const ConfigurationStack = createStackNavigator();
export const ConfigurationStackScreen = () => (
  <ConfigurationStack.Navigator>
    <ConfigurationStack.Screen
      name={ROUTES.CONFIGURATION}
      component={Configuration}
      options={{ title: TABS.CONFIGURATION }}
    />
  </ConfigurationStack.Navigator>
);
