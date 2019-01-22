import React, { Component } from 'react';
import {
  Alert,
  Share,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import { FontAwesome, Feather } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';

import { Spinner } from '../../components/Spinner';
import { Error } from '../../components/Error';
import TeamDetail from '../../components/TeamDetail';
import ListTeam from '../../components/ListTeam';
import SlideImages from '../../components/SlideImages';

import language from '../../assets/language/iso.json';
import { width } from '../../utils/Metrics';
import styles from './styles';

export default class MovieDetailsScreen extends Component {
  state = {
    isLoading: true,
    isError: false,
    showPerson: false,
    showImage: false,
    credit_id: null
  };

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Movie details',
      headerRight: (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ paddingRight: 15, paddingLeft: 20 }}
          onPress={params.actionShare}
        >
          <Feather name="share" size={23} color="#47525E" />
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ actionShare: this.actionShare });
    this.requestMoviesInfo();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.showPerson !== nextState.showPerson ||
      this.state.showImage !== nextState.showImage ||
      this.state.isLoading !== nextState.isLoading ||
      this.state.isError !== nextState.isError
    ) {
      return true;
    }
    return false;
  }

  sliceArrayLength(arr, num) {
    return arr.length > num ? arr.slice(0, num) : arr;
  }

  convertRatingToStars(vote_average) {
    vote_average = vote_average > 5 ? Math.round(vote_average) : vote_average;
    const length =
      vote_average !== 10
        ? parseInt((vote_average + '').charAt(0)) - 5
        : vote_average - 5;
    return vote_average <= 5
      ? null
      : [...Array(length)].map((e, i) => (
          <FontAwesome
            key={i}
            name="star"
            size={width * 0.06}
            color="#fff"
            style={{ marginRight: 5 }}
          />
        ));
  }

  convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h && m ? `${h}h ${m}m` : 'Uninformed';
  }

  convertToGenre() {
    const { genre } = this.state;
    return genre.length > 0
      ? genre.length > 1
        ? `${genre[0].name}, ${genre[1].name}`
        : genre[0].name
      : 'Uninformed';
  }

  convertToUpperCaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  convertToDate(value) {
    const date = new Date(value);
    return (
      date.getDate() +
        1 +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() || 'Uninformed'
    );
  }

  convertToDolar(value) {
    return (
      '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ||
      'Uninformed'
    );
  }

  convertAdult(value) {
    return value === false ? 'Yes' : 'No' || 'Uninformed';
  }

  getImageApi(image) {
    image = image || '';
    return image !== ''
      ? { uri: `https://image.tmdb.org/t/p/w500/${image}` }
      : require('../../assets/images/not_found.png');
  }

  formatImageUrl(images) {
    return this.sliceArrayLength(images, 15).map(x => {
      return { url: `https://image.tmdb.org/t/p/original/${x.file_path}` };
    });
  }

  requestMoviesInfo = async () => {
    this.setState({ isLoading: true });
    const { id } = this.props.navigation.state.params;

    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=024d69b581633d457ac58359146c43f6&language=en-US&include_image_language=en,null&append_to_response=credits,videos,images`
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
        production_companies: this.sliceArrayLength(
          data.production_companies,
          10
        ),
        images: this.formatImageUrl(data.images.backdrops)
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  };

  renderLoading = () => <Spinner />;

  renderErrorMessage = () => (
    <Error icon="alert-octagon" action={this.requestMoviesInfo} />
  );

  renderListEmpty = () => (
    <View>
      <Text style={styles.subTitleInfo}>Uninformed</Text>
    </View>
  );

  actionPlayVideo = () => {
    const { key } = this.state.video;
    const { navigate } = this.props.navigation;

    navigate('WebView', { key });
  };

  actionImage = () => {
    this.setState(({ showImage }) => {
      return { showImage: !showImage };
    });
  };

  actionShare = () => {
    const { isError, title, id } = this.state;

    if (isError) {
      Alert.alert(
        'Attention',
        'Something wrong has happened, please try again later.',
        [],
        { cancelable: true }
      );
    } else {
      Share.share(
        {
          message: `${title}, know everything about this movie \u{1F37F}`,
          url: `https://www.themoviedb.org/movie/${id}`,
          title: 'AmoCinema'
        },
        {
          dialogTitle: `${title}, know everything about this movie \u{1F37F}`
        }
      );
    }
  };

  actionPerson = (credit_id = '') => {
    this.setState(({ showPerson }) => {
      return { credit_id, showPerson: !showPerson };
    });
  };

  render() {
    const {
      isLoading,
      isError,
      backdrop_path,
      video,
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
      images,
      credit_id,
      showPerson,
      showImage
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          this.renderLoading()
        ) : isError ? (
          this.renderErrorMessage()
        ) : (
          <ScrollView>
            <View style={styles.containerMainPhoto}>
              <Image
                source={this.getImageApi(backdrop_path)}
                style={styles.mainPhoto}
                resizeMode="cover"
              />
              {video && video.site === 'YouTube' && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.play}
                  onPress={this.actionPlayVideo}
                >
                  <FontAwesome
                    name="play"
                    size={width * 0.07}
                    color="#fff"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.containerMainPhotoInfo}
                activeOpacity={images.length ? 0.5 : 1}
                onPress={images.length ? this.actionImage : null}
              >
                <View style={styles.containerBackgroundPhotoInfo}>
                  <Text numberOfLines={2} style={styles.photoInfo}>
                    {title}
                  </Text>
                  <View style={styles.photoStar}>
                    {this.convertRatingToStars(vote_average)}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.containerMovieInfo}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.movieFirstInfo}
              >
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Duration</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertMinsToHrsMins(runtime)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Genre</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToGenre()}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Language</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToUpperCaseFirstLetter(original_language)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Release</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToDate(release_date)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Budget</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToDolar(budget)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Revenue</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToDolar(revenue)}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Adult</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertAdult(adult)}
                  </Text>
                </View>
              </ScrollView>
              <View style={styles.movieSecondInfo}>
                <Text style={styles.titleInfo}>Synopsis</Text>
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
                <Text style={styles.titleInfo}>Main cast</Text>
                <ListTeam
                  data={cast}
                  type="character"
                  keyItem="credit_id"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                />
              </View>
              <View style={styles.movieSecondInfo}>
                <Text style={styles.titleInfo}>Main technical team</Text>
                <ListTeam
                  data={crew}
                  type="job"
                  keyItem="credit_id"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                />
              </View>
              <View style={[styles.movieSecondInfo, styles.movieLastInfo]}>
                <Text style={styles.titleInfo}>Producer</Text>
                <ListTeam
                  data={production_companies}
                  type="production"
                  keyItem="id"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                />
              </View>
            </View>
            <Modal
              isVisible={showPerson}
              onBackdropPress={() => this.setState({ showPerson: false })}
              useNativeDriver={true}
              hideModalContentWhileAnimating={true}
              backdropOpacity={0.5}
              style={styles.bottomModal}
            >
              <TeamDetail
                credit_id={credit_id}
                actionClose={this.actionPerson}
              />
            </Modal>
            {images.length ? (
              <SlideImages
                showImage={showImage}
                images={images}
                actionClose={this.actionImage}
              />
            ) : null}
          </ScrollView>
        )}
      </View>
    );
  }
}

const renderTruncatedFooter = handlePress => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <Text style={styles.readMore}>Read more</Text>
    </TouchableOpacity>
  );
};

const renderRevealedFooter = handlePress => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <Text style={styles.readMore}>Read less</Text>
    </TouchableOpacity>
  );
};
