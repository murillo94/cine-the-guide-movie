import MovieList from '../screens/MovieList';
import Configuration from '../screens/Configuration';
import MovieDetails from '../screens/MovieDetails';
import Search from '../screens/Search';
import MovieVideo from '../screens/MovieVideo';

import ROUTES from './routes';

import { darkBlue, white } from '../utils/colors';

const navigationOptions = {
  headerTintColor: darkBlue,
  headerStyle: {
    backgroundColor: white
  }
};

export const MoviesScreen = {
  [ROUTES.MOVIE_LIST]: {
    screen: MovieList,
    navigationOptions: {
      ...navigationOptions,
      title: 'Home'
    }
  },
  [ROUTES.MOVIE_DETAILS]: {
    screen: MovieDetails,
    navigationOptions
  },
  [ROUTES.MOVIE_VIDEO]: {
    screen: MovieVideo,
    navigationOptions
  }
};

export const SearchScreen = {
  [ROUTES.SEARCH]: {
    screen: Search,
    navigationOptions: {
      ...navigationOptions,
      title: 'Search'
    }
  },
  [ROUTES.SEARCH_RESULTS]: {
    screen: MovieList,
    navigationOptions
  },
  [ROUTES.MOVIE_DETAILS]: {
    screen: MovieDetails,
    navigationOptions
  },
  [ROUTES.MOVIE_VIDEO]: {
    screen: MovieVideo,
    navigationOptions
  }
};

export const ConfigurationScreen = {
  [ROUTES.CONFIGURATION]: {
    screen: Configuration,
    navigationOptions: {
      ...navigationOptions,
      title: 'More'
    }
  }
};
