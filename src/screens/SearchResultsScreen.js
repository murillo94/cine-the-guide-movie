import React, { Component } from 'react';
import { AsyncStorage, Platform, ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import List from './../components/List';
import { fontSizeResponsive, width } from './../config/Metrics';

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
    typeRequest: this.props.navigation.state.params.typeRequest,
  }

  static navigationOptions = () => {
    return {
      title: 'Search result',
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('@ConfigKey');
      if (value !== null) {
        const arr = JSON.parse(value);
        this.setState({
          hasAdultContent: arr.hasAdultContent,
        }, () => {
          this.requestMoviesList();
        });
      }
    } catch (error) {
      this.requestMoviesList();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.results !== nextState.results || this.state.isLoading !== nextState.isLoading || this.state.isLoadingMore !== nextState.isLoadingMore 
      || this.state.isError !== nextState.isError || this.state.keyGrid !== nextState.keyGrid) {
      return true;
    }
    return false;
  }

  async requestMoviesList() {
    const { page, name, id, typeRequest, hasAdultContent } = this.state;
    const date_release = new Date().toISOString().slice(0, 10);
    const query = typeRequest === 'search' ? `query=${encodeURIComponent(name)}` : `with_genres=${id}`;

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
        results: [...results, ...data.results],
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
        isLoadingMore: false,
        isError: true,
      }); 
    }
  }

  renderLoading = () => (
    <View>
      {Platform.OS === 'ios' ? 
        <ActivityIndicator size='small' color="#47525E" />
      :
        <ActivityIndicator size={50} color="#47525E" />
      }
    </View>
  )

  renderErrorMessage = () => (
    <View style={styles.containerError}>
      <Feather name="alert-octagon" size={width * 0.2} color="#47525E" />
      <Text style={styles.errorInfo}>
        Something wrong has happened, please try again later.
      </Text>
    </View>
  )

  renderFooter = () => {
    const { isLoadingMore, total_pages, page, results } = this.state;

    if(isLoadingMore) {
      return (
        <View style={styles.loadingMore}>
          <ActivityIndicator size='small' color="#47525E" />
        </View>
      )
    }

    if(total_pages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity style={styles.loadingButton} activeOpacity={0.5} onPress={() => this.actionLoadMore()}>
            <Text style={styles.loadingText}>
              Load more
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if(results.length > 0) {
      return (
        <View style={styles.loadingMore}></View>
      )
    }

    return null;
  }

  renderListEmpty = () => (
    <View style={styles.containerError}>
      <Feather name="thumbs-down" size={width * 0.2} color="#47525E" />
      <Text style={styles.errorInfo}>
        No results available.
      </Text>
    </View>
  )

  actionLoadMore = () => {
    this.setState(({ page }) => ({
      isLoadingMore: true,
      page: page + 1,
    }), () => {
      this.requestMoviesList();
    });
  }

  actionGrid = () => {
    this.setState(({ numColumns, keyGrid }) => { return {numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1}});
  }

  render() {
    const { navigate } = this.props.navigation;
    const { name, typeRequest, isLoading, isLoadingMore, isError, results, numColumns, keyGrid } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && !isLoadingMore ? 
          this.renderLoading()
        : isError ?
          this.renderErrorMessage()
        : results.length === 0 ? 
          this.renderListEmpty()
        :
          <View style={styles.containerList}>
            {results.length > 0 &&
              <View style={styles.containerMainText}>
                <Text style={styles.textMain} numberOfLines={1}>
                  {name}
                </Text>
                <TouchableOpacity style={[styles.buttonGrid, numColumns === 2 && styles.buttonGridActive]} activeOpacity={0.5} onPress={this.actionGrid}>
                  <Feather name="grid" size={22} color="#47525E" />
                </TouchableOpacity>
              </View>
            }
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
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  containerList: {
    justifyContent: 'center',
    flex: 1,
  },
  containerMainText: {
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  textMain: {
    fontSize: fontSizeResponsive(3),
    fontWeight: 'bold',
    color: '#47525E',
    width: '80%',
  },
  buttonGrid: {
    position: 'absolute',
    right: 12,
    top: 18,
    padding: 8,
    borderRadius: 100,
  },
  buttonGridActive: {
    backgroundColor: '#efefef',
  },
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  errorInfo: {
    fontSize: fontSizeResponsive(2.6),
    color: '#8190A5',
    textAlign: 'center',
    padding: 25,
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#efefef',
  },
  loadingText: {
    fontSize: fontSizeResponsive(2.1),
    color: '#47525E',
    textAlign: 'center',
  },
});
