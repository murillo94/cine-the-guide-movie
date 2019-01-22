import React, { Component } from 'react';
import { AsyncStorage, View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Spinner } from '../../components/Spinner';
import { Error } from '../../components/Error';
import List from '../../components/List';

import styles from './styles';

export default class SearchResultsScreen extends Component {
  state = {
    isLoading: false,
    isLoadingMore: false,
    isError: false,
    hasAdultContent: false,
    results: [],
    page: 1,
    numColumns: 1,
    keyGrid: 1,
    id: this.props.navigation.state.params.id,
    name: this.props.navigation.state.params.name,
    typeRequest: this.props.navigation.state.params.typeRequest
  };

  static navigationOptions = () => {
    return {
      title: 'Search result'
    };
  };

  async componentDidMount() {
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
      this.state.isLoading !== nextState.isLoading ||
      this.state.isLoadingMore !== nextState.isLoadingMore ||
      this.state.isError !== nextState.isError ||
      this.state.keyGrid !== nextState.keyGrid
    ) {
      return true;
    }
    return false;
  }

  requestMoviesList = async () => {
    const { page, name, id, typeRequest, hasAdultContent } = this.state;
    const date_release = new Date().toISOString().slice(0, 10);
    const query =
      typeRequest === 'search'
        ? `query=${encodeURIComponent(name)}`
        : `with_genres=${id}`;

    try {
      this.setState({ isLoading: true });
      let response = await fetch(
        `https://api.themoviedb.org/3/${typeRequest}/movie?api_key=024d69b581633d457ac58359146c43f6&language=en-US&${query}&page=${page}&release_date.lte=${date_release}&include_adult=${hasAdultContent}&with_release_type=1|2|3|4|5|6|7`
      );
      let data = await response.json();
      this.setState(({ results }) => ({
        isLoading: false,
        isLoadingMore: false,
        isError: false,
        total_pages: data.total_pages,
        results: [...results, ...data.results]
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
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

  render() {
    const { navigate } = this.props.navigation;
    const {
      name,
      typeRequest,
      isLoading,
      isLoadingMore,
      isError,
      results,
      numColumns,
      keyGrid
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && !isLoadingMore ? (
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
                  {name}
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
              type={name}
              isSearch={typeRequest === 'search' ? true : false}
              keyGrid={keyGrid}
              numColumns={numColumns}
              refreshing={null}
              onRefresh={null}
              ListFooterComponent={this.renderFooter}
              navigate={navigate}
            />
          </View>
        )}
      </View>
    );
  }
}
