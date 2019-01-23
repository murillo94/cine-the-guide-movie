import React, { Component } from 'react';
import { Asset } from 'expo';
import { AsyncStorage, View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Assets as StackAssets } from 'react-navigation-stack';

import { Spinner } from '../../components/Spinner';
import { Error } from '../../components/Error';
import Filter from '../../components/Filter';
import List from '../../components/List';

import styles from './styles';

export default class MovieListScreen extends Component {
  state = {
    isVisible: false,
    isLoading: false,
    isRefresh: false,
    isLoadingMore: false,
    isError: false,
    hasAdultContent: false,
    filterType: 'popularity.desc',
    filterName: 'Most popular',
    results: [],
    page: 1,
    numColumns: 1,
    keyGrid: 1
  };

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerRight: (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ paddingRight: 15, paddingLeft: 20 }}
          onPress={params.actionFilter}
        >
          <Feather name="filter" size={23} color="#47525E" />
        </TouchableOpacity>
      )
    };
  };

  async componentDidMount() {
    Asset.loadAsync(StackAssets);
    this.props.navigation.setParams({ actionFilter: this.actionFilter });

    try {
      const value = await AsyncStorage.getItem('@ConfigKey');
      if (value !== null) {
        const arr = JSON.parse(value);
        this.setState(
          {
            hasAdultContent: arr.hasAdultContent
          },
          () => {
            this.requestMoviesList();
          }
        );
      } else {
        this.requestMoviesList();
      }
    } catch (error) {
      this.requestMoviesList();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.results !== nextState.results ||
      this.state.isVisible !== nextState.isVisible ||
      this.state.isLoading !== nextState.isLoading ||
      this.state.isRefresh !== nextState.isRefresh ||
      this.state.isLoadingMore !== nextState.isLoadingMore ||
      this.state.isError !== nextState.isError ||
      this.state.keyGrid !== nextState.keyGrid
    ) {
      return true;
    }
    return false;
  }

  requestMoviesList = async () => {
    const { page, filterType, hasAdultContent } = this.state;
    const date_release = new Date().toISOString().slice(0, 10);

    try {
      this.setState({ isLoading: true });

      let response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=024d69b581633d457ac58359146c43f6&language=en-US&sort_by=${filterType}&page=${page}&release_date.lte=${date_release}&include_adult=${hasAdultContent}&with_release_type=1|2|3|4|5|6|7`
      );

      let data = await response.json();
      this.setState(({ isRefresh, results }) => ({
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: false,
        total_pages: data.total_pages,
        results: isRefresh ? data.results : [...results, ...data.results]
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: true
      });
    }
  };

  renderLoading = () => <Spinner />;

  renderErrorMessage = () => (
    <Error icon="alert-octagon" action={this.requestMoviesList} />
  );

  renderListEmpty = () => (
    <Error icon="thumbs-down" textError="No results available." />
  );

  renderFooter = () => {
    const { isLoadingMore, total_pages, page, results } = this.state;

    if (isLoadingMore) return <Spinner size={'small'} />;

    if (total_pages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            activeOpacity={0.5}
            onPress={this.actionLoadMore}
          >
            <Text style={styles.loadingText}>Load more</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (results.length > 0) return <View style={styles.loadingMore} />;

    return null;
  };

  actionRefresh = () => {
    this.setState(
      {
        isRefresh: true,
        page: 1
      },
      () => {
        this.requestMoviesList();
      }
    );
  };

  actionLoadMore = () => {
    this.setState(
      ({ page }) => ({
        isLoadingMore: true,
        page: page + 1
      }),
      () => {
        this.requestMoviesList();
      }
    );
  };

  actionGrid = () => {
    this.setState(({ numColumns, keyGrid }) => {
      return { numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1 };
    });
  };

  actionFilter = () => {
    this.setState(({ isVisible }) => {
      return { isVisible: !isVisible };
    });
  };

  actionSwitchMovie = (filterType, filterName, isVisible) => {
    if (this.state.filterType !== filterType) {
      this.setState(
        { filterType, filterName, isVisible, page: 1, results: [] },
        () => {
          this.requestMoviesList();
        }
      );
    } else {
      this.setState({ isVisible });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      isLoading,
      isRefresh,
      isLoadingMore,
      isError,
      results,
      filterName,
      isVisible,
      filterType,
      numColumns,
      keyGrid
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && !isRefresh && !isLoadingMore ? (
          this.renderLoading()
        ) : isError ? (
          this.renderErrorMessage()
        ) : results.length === 0 ? (
          this.renderListEmpty()
        ) : (
          <View style={styles.containerList}>
            {results.length > 0 && (
              <View style={styles.containerMainText}>
                <Text style={styles.textMain} numberOfLines={1}>
                  {filterName}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.buttonGrid,
                    numColumns === 2 && styles.buttonGridActive
                  ]}
                  activeOpacity={0.5}
                  onPress={this.actionGrid}
                >
                  <Feather name="grid" size={22} color="#47525E" />
                </TouchableOpacity>
              </View>
            )}
            <List
              data={results}
              type="normal"
              isSearch={false}
              keyGrid={keyGrid}
              numColumns={numColumns}
              refreshing={isRefresh}
              onRefresh={this.actionRefresh}
              ListFooterComponent={this.renderFooter}
              navigate={navigate}
            />
          </View>
        )}
        <Filter
          isVisible={isVisible}
          filterType={filterType}
          filterName={filterName}
          actionFilter={this.actionFilter}
          actionSwitchMovie={this.actionSwitchMovie}
          style={styles.bottomModal}
        />
      </View>
    );
  }
}
