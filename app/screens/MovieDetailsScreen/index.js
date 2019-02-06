import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

import { FontAwesome, Feather } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';

import { Alert } from '../../components/Alert';
import { Share } from '../../components/Share';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import TeamDetail from '../../components/TeamDetail';
import ListTeam from '../../components/ListTeam';
import SlideImages from '../../components/SlideImages';
import { TouchableOpacity } from '../../components/TouchableOpacity';

import request from '../../services/Api';

import language from '../../assets/language/iso.json';
import { width } from '../../utils/Metrics';
import { darkBlue, white } from '../../styles/Colors';

import styles from './styles';

const uninformed = 'Uninformed';

const renderTruncatedFooter = handlePress => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>Read more</Text>
  </TouchableOpacity>
);

const renderRevealedFooter = handlePress => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>Read less</Text>
  </TouchableOpacity>
);

export default class MovieDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Movie details',
      headerRight: (
        <TouchableOpacity
          style={styles.buttonShare}
          onPress={params.actionShare}
        >
          <Feather name="share" size={23} color={darkBlue} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    isLoading: true,
    isError: false,
    isVisible: false,
    showImage: false,
    creditId: null
  };

  componentDidMount() {
    this.props.navigation.setParams({ actionShare: this.actionShare });
    this.requestMoviesInfo();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.isVisible !== nextState.isVisible ||
      this.state.showImage !== nextState.showImage ||
      this.state.isLoading !== nextState.isLoading ||
      this.state.isError !== nextState.isError
    ) {
      return true;
    }
    return false;
  }

  requestMoviesInfo = async () => {
    try {
      this.setState({ isLoading: true });

      const { id } = this.props.navigation.state.params;

      const data = await request(`movie/${id}`, {
        include_image_language: 'en,null',
        append_to_response: 'credits,videos,images'
      });

      this.setState({
        isLoading: false,
        isError: false,
        id,
        backdropPath: data.backdrop_path || '',
        title: data.title || '',
        voteAverage: data.vote_average || 0,
        video: data.videos.results[0] || [],
        runtime: data.runtime || 0,
        originalLanguage: language[data.original_language] || '',
        genre: this.sliceArrayLength(data.genres, 2) || '',
        releaseDate: data.release_date || '',
        budget: data.budget || 0,
        revenue: data.revenue || 0,
        adult: data.adult || '',
        overview: data.overview || uninformed,
        cast: this.sliceArrayLength(data.credits.cast, 15),
        crew: this.sliceArrayLength(data.credits.crew, 15),
        productionCompanies: this.sliceArrayLength(
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

  getImageApi = () => {
    const { backdropPath } = this.state;

    return backdropPath
      ? { uri: `https://image.tmdb.org/t/p/w500/${backdropPath}` }
      : require('../../assets/images/not_found.png'); // eslint-disable-line global-require
  };

  formatImageUrl = images => {
    return this.sliceArrayLength(images, 15).map(item => {
      return { url: `https://image.tmdb.org/t/p/original/${item.file_path}` };
    });
  };

  sliceArrayLength = (arr, num) => {
    return arr.length > num ? arr.slice(0, num) : arr;
  };

  convertToDolar = value => {
    return (
      `$${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` ||
      uninformed
    );
  };

  convertAdult = () => {
    const { adult } = this.state;

    return adult === false ? 'Yes' : 'No' || uninformed;
  };

  convertRatingToStars = () => {
    let { voteAverage } = this.state;

    voteAverage = voteAverage > 5 ? Math.round(voteAverage) : voteAverage;
    const length =
      voteAverage !== 10
        ? parseInt(`${voteAverage}`.charAt(0)) - 5
        : voteAverage - 5;
    return voteAverage <= 5
      ? null
      : /* eslint-disable react/no-array-index-key */
        [...Array(length)].map((e, i) => (
          <FontAwesome
            key={i}
            name="star"
            size={width * 0.06}
            color={white}
            style={styles.star}
          />
        ));
    /* eslint-enable react/no-array-index-key */
  };

  convertMinsToHrsMins = () => {
    const { runtime } = this.state;

    let h = Math.floor(runtime / 60);
    let m = runtime % 60;
    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    return h && m ? `${h}h ${m}m` : uninformed;
  };

  convertToGenre = () => {
    const { genre } = this.state;

    return genre.length > 0
      ? genre.length > 1
        ? `${genre[0].name}, ${genre[1].name}`
        : genre[0].name
      : uninformed;
  };

  convertToUpperCaseFirstLetter = () => {
    const { originalLanguage } = this.state;

    return originalLanguage.charAt(0).toUpperCase() + originalLanguage.slice(1);
  };

  convertToDate = () => {
    const { releaseDate } = this.state;

    const date = new Date(releaseDate);
    return (
      `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}` ||
      uninformed
    );
  };

  actionPerson = (creditId = '') => {
    this.setState(({ isVisible }) => {
      return { creditId, isVisible: !isVisible };
    });
  };

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
      Alert({
        title: 'Attention',
        description: 'Something wrong has happened, please try again later.'
      });
    } else {
      Share({
        message: `${title}, know everything about this movie \u{1F37F}`,
        url: `https://www.themoviedb.org/movie/${id}`,
        title: 'AmoCinema',
        dialogTitle: `${title}, know everything about this movie \u{1F37F}`
      });
    }
  };

  renderListEmpty = () => (
    <View>
      <Text style={styles.subTitleInfo}>Uninformed</Text>
    </View>
  );

  render() {
    const {
      isLoading,
      isError,
      video,
      title,
      budget,
      revenue,
      overview,
      cast,
      crew,
      productionCompanies,
      images,
      creditId,
      isVisible,
      showImage
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Error icon="alert-octagon" action={this.requestMoviesInfo} />
        ) : (
          <ScrollView>
            <View style={styles.containerMainPhoto}>
              <Image
                source={this.getImageApi()}
                style={styles.mainPhoto}
                resizeMode="cover"
              />
              {video && video.site === 'YouTube' && (
                <TouchableOpacity
                  style={styles.play}
                  onPress={this.actionPlayVideo}
                >
                  <FontAwesome
                    name="play"
                    size={width * 0.07}
                    color={white}
                    style={styles.buttonPlay}
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
                    {this.convertRatingToStars()}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.containerMovieInfo}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.movieFirstInfo}
              >
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Duration</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertMinsToHrsMins()}
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
                    {this.convertToUpperCaseFirstLetter()}
                  </Text>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.titleInfo}>Release</Text>
                  <Text style={styles.subTitleInfo}>
                    {this.convertToDate()}
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
                  <Text style={styles.subTitleInfo}>{this.convertAdult()}</Text>
                </View>
              </ScrollView>
              <View style={styles.movieSecondInfo}>
                <Text style={styles.titleInfo}>Synopsis</Text>
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}
                >
                  <Text style={styles.subTitleInfo}>{overview}</Text>
                </ReadMore>
              </View>
              <View style={styles.movieSecondInfo}>
                <Text style={styles.titleInfo}>Main cast</Text>
                <ListTeam
                  data={cast}
                  type="character"
                  keyItem="creditId"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                />
              </View>
              <View style={styles.movieSecondInfo}>
                <Text style={styles.titleInfo}>Main technical team</Text>
                <ListTeam
                  data={crew}
                  type="job"
                  keyItem="creditId"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                />
              </View>
              <View style={[styles.movieSecondInfo, styles.movieLastInfo]}>
                <Text style={styles.titleInfo}>Producer</Text>
                <ListTeam
                  data={productionCompanies}
                  type="production"
                  keyItem="id"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                />
              </View>
            </View>
            {images.length ? (
              <SlideImages
                showImage={showImage}
                images={images}
                actionClose={this.actionImage}
              />
            ) : null}
          </ScrollView>
        )}
        <TeamDetail
          isVisible={isVisible}
          creditId={creditId}
          actionClose={this.actionPerson}
          style={styles.bottomModal}
        />
      </View>
    );
  }
}
