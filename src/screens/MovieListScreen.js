import React, { Component } from 'react';
import { Asset } from 'expo';
import {
  AsyncStorage,
  Platform,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import Filter from './../components/Filter';
import List from './../components/List';
import { fontSizeResponsive, width } from './../config/Metrics';

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
    Asset.fromModule(
      require('react-navigation/src/views/assets/back-icon-mask.png')
    ).downloadAsync();
    Asset.fromModule(
      require('react-navigation/src/views/assets/back-icon.png')
    ).downloadAsync();
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

  async requestMoviesList() {
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
  }

  renderLoading = () => (
    <View>
      {Platform.OS === 'ios' ? (
        <ActivityIndicator size="small" color="#47525E" />
      ) : (
        <ActivityIndicator size={50} color="#47525E" />
      )}
    </View>
  );

  renderErrorMessage = () => (
    <View style={styles.containerError}>
      <Feather name="alert-octagon" size={width * 0.2} color="#47525E" />
      <Text style={styles.errorInfo}>
        Something wrong has happened, please try again later.
      </Text>
    </View>
  );

  renderFooter = () => {
    const { isLoadingMore, total_pages, page, results } = this.state;

    if (isLoadingMore) {
      return (
        <View style={styles.loadingMore}>
          <ActivityIndicator size="small" color="#47525E" />
        </View>
      );
    }

    if (total_pages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            activeOpacity={0.5}
            onPress={() => this.actionLoadMore()}
          >
            <Text style={styles.loadingText}>Load more</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (results.length > 0) {
      return <View style={styles.loadingMore} />;
    }

    return null;
  };

  renderListEmpty = () => (
    <View style={styles.containerError}>
      <Feather name="thumbs-down" size={width * 0.2} color="#47525E" />
      <Text style={styles.errorInfo}>No results available.</Text>
    </View>
  );

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
            <View style={styles.containerModal}>
              <Modal
                isVisible={isVisible}
                onBackdropPress={() => this.setState({ isVisible: false })}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0.5}
                style={styles.bottomModal}
              >
                <Filter
                  actionFilter={this.actionFilter}
                  actionSwitchMovie={this.actionSwitchMovie}
                  filterType={filterType}
                  filterName={filterName}
                />
              </Modal>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  containerList: {
    justifyContent: 'center',
    flex: 1
  },
  containerMainText: {
    paddingVertical: 25,
    paddingHorizontal: 20
  },
  textMain: {
    fontSize: fontSizeResponsive(3),
    fontWeight: 'bold',
    color: '#47525E',
    width: '80%'
  },
  buttonGrid: {
    position: 'absolute',
    right: 12,
    top: 18,
    padding: 8,
    borderRadius: 100
  },
  buttonGridActive: {
    backgroundColor: '#efefef'
  },
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  errorInfo: {
    fontSize: fontSizeResponsive(2.6),
    color: '#8190A5',
    textAlign: 'center',
    padding: 25
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#efefef'
  },
  loadingText: {
    fontSize: fontSizeResponsive(2.1),
    color: '#47525E',
    textAlign: 'center'
  }
});
