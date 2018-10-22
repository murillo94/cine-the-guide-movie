import React, { Component } from 'react';
import { Platform, ActivityIndicator, Alert, Share, StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

import { FontAwesome, Feather } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';

import { fontSizeResponsive, width } from './../config/Metrics';
import TeamDetail from './../components/TeamDetail';
import ListTeam from './../components/ListTeam';

import language from './../assets/language/iso-langague.json';

export default class MovieDetailsScreen extends Component {
  state = {
    isLoading: true,
    isError: false,
    isVisible: false,
    credit_id: null,
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Movie details',
      headerRight: (
        <TouchableOpacity activeOpacity={0.5} style={{paddingRight: 15, paddingLeft: 20}} onPress={params.actionShare}>
          <Feather name="share" size={23} color="#47525E" />
        </TouchableOpacity>
      ),
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ actionShare: this.actionShare });
    this.requestMoviesInfo();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.isVisible !== nextState.isVisible || this.state.isLoading !== nextState.isLoading || this.state.isError !== nextState.isError) {
      return true;
    }
    return false;
  }

  sliceArrayLength(arr, num) {
    return arr.length > num ? arr.slice(0, num) : arr;
  }

  convertRatingToStars(vote_average) {
    vote_average = vote_average > 5 ? Math.round(vote_average) : vote_average;
    const length = vote_average !== 10 ? parseInt((vote_average + '').charAt(0)) - 5 : vote_average - 5;
    return vote_average <= 5 ? null : [...Array(length)].map((e, i) => <FontAwesome key={i} name="star" size={width * 0.06} color="#ffffff" style={{marginRight: 5}} />)
  }

  convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h && m ? `${h}h ${m}m`: 'Uninformed';
  }

  convertToGenre() {
    const { genre } = this.state;
    return genre.length > 0 ? (genre.length > 1 ? `${genre[0].name}, ${genre[1].name}` : genre[0].name) : 'Uninformed';
  }

  convertToUpperCaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  convertToDate(value) {
    const date = new Date(value);
    return (date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() || 'Uninformed';
  }

  convertToDolar(value) {
    return "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") || 'Uninformed';
  }

  convertAdult(value) {
    return value === false ? 'Yes' : 'No' || 'Uninformed';
  }

  getImageApi(image) {
    image = image || '';
    return image !== '' ? {uri: `https://image.tmdb.org/t/p/w500/${image}`} : require('./../assets/images/not_found.png');
  }

  async requestMoviesInfo() {
    this.setState({ isLoading: true });
    const { id } = this.props.navigation.state.params;

    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=024d69b581633d457ac58359146c43f6&language=en-US&append_to_response=credits,videos`
      );
      let data = await response.json();
      this.setState({
        isLoading: false,
        isError: false,
        id: id,
        backdrop_path: data.backdrop_path || '',
        title: data.title || '',
        vote_average: data.vote_average || 0,
        video: data.videos.results[0] || [],
        runtime: data.runtime || 0,
        original_language: language[data.original_language] || '',
        genre: this.sliceArrayLength(data.genres, 2) || '',
        release_date: data.release_date || '',
        budget: data.budget || 0,
        revenue: data.revenue || 0,
        adult: data.adult || '',
        overview: data.overview || '',
        cast: this.sliceArrayLength(data.credits.cast, 15),
        crew: this.sliceArrayLength(data.credits.crew, 15),
        production_companies: this.sliceArrayLength(data.production_companies, 10),
      });
    } catch (err) {
      this.setState({
        isLoading: false,
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
    <View style={styles.container}>
      <Feather name="alert-octagon" size={width * 0.2} color="#47525E" />
      <Text style={styles.errorInfo}>
        Something wrong has happened, please try again later.
      </Text>
    </View>
  )

  renderListEmpty = () => (
    <View>
      <Text style={styles.subTitleInfo}>
        Uninformed
      </Text>
    </View>
  )

  actionPlayVideo = () => {
    const { video } = this.state;
    const { navigate } = this.props.navigation;

    if(video && video.site === "YouTube") {
      navigate('WebView', { key: video.key })
    } else {
      Alert.alert('Attention', 'This movie has no trailer to show.', [], { cancelable: true });
    }
  }

  actionShare = () => {
    const { isError, title, id } = this.state;
  
    if(isError) {
      Alert.alert('Attention', 'Something wrong has happened, please try again later.', [], { cancelable: true });
    } else {
      Share.share({
        message: `${title}, know everything about this movie \u{1F37F}`,
        url: `https://www.themoviedb.org/movie/${id}`,
        title: 'AmoCinema'
      }, {
        // Android
        dialogTitle: `${title}, know everything about this movie \u{1F37F}`,
      });
    }
  }

  actionTeamDetail = (credit_id) => {
    this.setState(({ isVisible }) => {
      return { credit_id, isVisible: !isVisible };
    });
  }

  actionClose = () => {
    this.setState(({ isVisible }) => {
      return { isVisible: !isVisible };
    });
  }

  render() {
    const { 
      isLoading,
      isError,
      backdrop_path,
      title,
      vote_average,
      runtime,
      original_language,
      release_date,
      budget,
      revenue,
      adult,
      overview,
      cast,
      crew,
      production_companies,
      credit_id,
      isVisible,
    } = this.state;
    
    return (
      <View style={styles.container}>
        {isLoading ? 
          this.renderLoading()
        : isError ?
          this.renderErrorMessage()
        :
          <ScrollView>
            <View style={styles.containerMainPhoto}>
              <Image source={this.getImageApi(backdrop_path)}
                style={styles.mainPhoto} resizeMode="cover" />
              <TouchableOpacity activeOpacity={0.5} style={styles.play} onPress={this.actionPlayVideo}>
                <FontAwesome name="play" size={width * 0.07} color="#ffffff" style={{marginLeft: 5}} />
              </TouchableOpacity>
              <View style={styles.containerMainPhotoInfo}>
                <View style={styles.containerBackgroundPhotoInfo}>
                  <Text numberOfLines={2} style={styles.photoInfo}>
                    {title}
                  </Text>
                  <View style={styles.photoStar}>
                    {this.convertRatingToStars(vote_average)}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.containerMovieInfo}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.movieFirstInfo}>
                <View style={styles.movieInfo}> 
                  <Text style={styles.titleInfo}>
                    Duration
                  </Text> 
                  <Text style={styles.subTitleInfo}>
                    {this.convertMinsToHrsMins(runtime)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>
                    Genre
                  </Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToGenre()}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>
                    Language
                  </Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToUpperCaseFirstLetter(original_language)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>
                    Release
                  </Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToDate(release_date)}
                  </Text>
                </View>
                <View style={styles.movieInfo}> 
                  <Text style={styles.titleInfo}>
                    Budget
                  </Text> 
                  <Text style={styles.subTitleInfo}>
                    {this.convertToDolar(budget)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>
                    Revenue
                  </Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToDolar(revenue)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>
                    Adult
                  </Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertAdult(adult)}
                  </Text>
                </View>
              </ScrollView>
              <View style={styles.movieSecondInfo}>
                <Text style={styles.titleInfo}>
                  Synopsis
                </Text>
                <ReadMore 
                  numberOfLines={3} 
                  renderTruncatedFooter={renderTruncatedFooter} 
                  renderRevealedFooter={renderRevealedFooter} 
                >
                  <Text style={styles.subTitleInfo}>
                    {overview || 'Uninformed'}
                  </Text>
                </ReadMore>
              </View>
              <View style={styles.movieSecondInfo}>
                <Text style={styles.titleInfo}>
                  Main cast
                </Text>
                <ListTeam 
                  data={cast} 
                  type='character' 
                  keyItem='credit_id' 
                  ListEmptyComponent={this.renderListEmpty} 
                  actionTeamDetail={this.actionTeamDetail} 
                />
              </View>
              <View style={styles.movieSecondInfo}>
                <Text style={styles.titleInfo}>
                  Main technical team
                </Text>
                <ListTeam 
                  data={crew} 
                  type='job' 
                  keyItem='credit_id' 
                  ListEmptyComponent={this.renderListEmpty} 
                  actionTeamDetail={this.actionTeamDetail} 
                />
              </View>
              <View style={[styles.movieSecondInfo, styles.movieLastInfo]}>
                <Text style={styles.titleInfo}>
                  Producer
                </Text>
                <ListTeam 
                  data={production_companies} 
                  type='production' 
                  keyItem='id' 
                  ListEmptyComponent={this.renderListEmpty} 
                  actionTeamDetail={this.actionTeamDetail} 
                />
              </View>
            </View>
            <View style={styles.containerModal}>
              <Modal 
                isVisible={isVisible} 
                onBackdropPress={() => this.setState({ isVisible: false })} 
                useNativeDriver={true} 
                hideModalContentWhileAnimating={true} 
                backdropOpacity={0.5} 
                style={styles.bottomModal} 
              >
                <TeamDetail credit_id={credit_id} actionClose={this.actionClose} />
              </Modal>
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}

const renderTruncatedFooter = (handlePress) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <Text style={styles.readMore}>
        Read more
      </Text>
    </TouchableOpacity>
  );
}

const renderRevealedFooter = (handlePress) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <Text style={styles.readMore}>
        Read less
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerMainPhoto: {
    width: width,
    height: width * 0.6,
  },
  mainPhoto: {
    width: '100%',
    height: '100%',
  },
  play: {
    position: 'absolute',
    zIndex: 1,
    bottom: -20,
    right: 15,
    borderRadius: width * 0.32,
    backgroundColor: '#F95F62',
    width: width * 0.16,
    height: width * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMainPhotoInfo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  containerBackgroundPhotoInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  photoInfo: {
    fontSize: fontSizeResponsive(3.8),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  photoStar: {
    flexDirection: 'row',
    marginTop: 8,
  },
  containerMovieInfo: {
    margin: 20,
    marginTop: 35,
  },
  movieFirstInfo: {
    flexDirection: 'row',
  },
  movieInfo: {
    marginRight: 25,
  },
  titleInfo: {
    fontSize: fontSizeResponsive(2.6),
    fontWeight: 'bold',
    color: '#47525E',
    marginBottom: 7,
  },
  subTitleInfo: {
    fontSize: fontSizeResponsive(2.1),
    color: '#8190A5',
    textAlign: 'justify',
  },
  readMore: {
    color: '#ff6a6a',
    marginTop: 5,
    textAlign: 'right',
  },
  movieSecondInfo: {
    marginTop: 35,
  },
  movieLastInfo: {
    marginBottom: 15,
  },
  errorInfo: {
    fontSize: fontSizeResponsive(2.6),
    color: '#8190A5',
    textAlign: 'center',
    padding: 25,
  },
  containerModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
