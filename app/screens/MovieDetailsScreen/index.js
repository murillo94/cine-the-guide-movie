import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';

import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import PosterRow from '../../components/cards/rows/PosterRow';
import PersonModal from '../../components/modals/PersonModal';
import PersonListRow from '../../components/cards/rows/PersonListRow';
import PersonRow from '../../components/cards/rows/PersonRow';
import SectionRow from '../../components/cards/rows/SectionRow';
import MainInfoRow from '../../components/cards/rows/MainInfoRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import request from '../../services/api';

import { convertToDate } from '../../utils/dates';
import { convertToUpperCaseFirstLetter } from '../../utils/letters';

import language from '../../assets/language/iso.json';

import { darkBlue } from '../../styles/colors';
import styles from './styles';

const UNINFORMED = 'Uninformed';
const INITIAL_INFO = {
  id: '',
  backdropPath: '',
  title: '',
  voteAverage: 0,
  video: [],
  overview: UNINFORMED,
  cast: [],
  crew: [],
  productionCompanies: [],
  images: [],
  infosDetail: {
    Duration: UNINFORMED,
    Genre: UNINFORMED,
    Language: UNINFORMED,
    Release: UNINFORMED,
    Budget: UNINFORMED,
    Revenue: UNINFORMED,
    Adult: UNINFORMED
  }
};

const renderReadMoreFooter = (text, handlePress) => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>{text}</Text>
  </TouchableOpacity>
);

const MovieDetailsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [creditId, setCreditId] = useState(null);
  const [info, setInfo] = useState(INITIAL_INFO);

  useEffect(() => {
    navigation.setParams({ handleShare });
    requestMoviesInfo();
  }, []);

  requestMoviesInfo = async () => {
    try {
      setIsLoading(true);

      const { id } = navigation.state.params;
      const data = await request(`movie/${id}`, {
        include_image_language: 'en,null',
        append_to_response: 'credits,videos,images'
      });

      setIsLoading(false);
      setIsError(false);
      setInfo({
        id,
        backdropPath: data.backdrop_path || INITIAL_INFO.backdropPath,
        title: data.title || INITIAL_INFO.title,
        voteAverage: data.vote_average || INITIAL_INFO.voteAverage,
        video: data.videos.results[0] || INITIAL_INFO.video,
        overview: data.overview || INITIAL_INFO.overview,
        cast: sliceArrayLength(data.credits.cast, 15),
        crew: sliceArrayLength(data.credits.crew, 15),
        productionCompanies: sliceArrayLength(data.production_companies, 10),
        images: formatImageUrl(data.images.backdrops),
        infosDetail: getInfosDetail(data)
      });
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  /* eslint-disable camelcase */
  getInfosDetail = ({
    runtime,
    genres,
    original_language,
    release_date,
    budget,
    revenue,
    adult
  }) => {
    return {
      Duration: convertMinsToHrsMins(runtime || 0),
      Genre: convertToGenre(sliceArrayLength(genres, 2) || ''),
      Language: convertToUpperCaseFirstLetter(
        language[original_language] || ''
      ),
      Release: convertToDate(release_date || ''),
      Budget: convertToDolar(budget || 0),
      Revenue: convertToDolar(revenue || 0),
      Adult: convertAdult(adult || '')
    };
  };
  /* eslint-enable camelcase */

  formatImageUrl = images => {
    return sliceArrayLength(images, 15).map(item => {
      return { url: `https://image.tmdb.org/t/p/original/${item.file_path}` };
    });
  };

  sliceArrayLength = (arr, num) => {
    return arr.length > num ? arr.slice(0, num) : arr;
  };

  convertToDolar = value => {
    return (
      `$${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` ||
      UNINFORMED
    );
  };

  convertAdult = adult => (adult === false ? 'Yes' : 'No' || UNINFORMED);

  convertMinsToHrsMins = runtime => {
    let h = Math.floor(runtime / 60);
    let m = runtime % 60;
    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    return h && m ? `${h}h ${m}m` : UNINFORMED;
  };

  convertToGenre = genre => {
    return genre.length > 0
      ? genre.length > 1
        ? `${genre[0].name}, ${genre[1].name}`
        : genre[0].name
      : UNINFORMED;
  };

  handleVisibleModal = () => {
    setIsVisible(!isVisible);
  };

  handlePerson = id => {
    setCreditId(id);
    handleVisibleModal();
  };

  handleImage = () => {
    setShowImage(!showImage);
  };

  handleShare = () => {
    const { title, id } = info;

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

  renderItem = (item, type, handleTeamDetail) => (
    <PersonRow item={item} type={type} onTeamDetail={handleTeamDetail} />
  );

  renderListEmpty = () => (
    <View>
      <Text style={styles.subTitleInfo}>Uninformed</Text>
    </View>
  );

  {
    const {
      backdropPath,
      voteAverage,
      video,
      title,
      infosDetail,
      overview,
      cast,
      crew,
      productionCompanies,
      images
    } = info;
    const { navigate } = navigation;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <NotificationCard icon="alert-octagon" onPress={requestMoviesInfo} />
        ) : (
          <ScrollView>
            <PosterRow
              title={title}
              backdropPath={backdropPath}
              voteAverage={voteAverage}
              images={images}
              video={video}
              navigate={navigate}
              showImage={showImage}
              onPress={handleImage}
            />
            <View style={styles.containerMovieInfo}>
              <MainInfoRow data={infosDetail} />
              <SectionRow title="Synopsis">
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={handlePress =>
                    renderReadMoreFooter('Read more', handlePress)
                  }
                  renderRevealedFooter={handlePress =>
                    renderReadMoreFooter('Read less', handlePress)
                  }
                >
                  <Text style={styles.subTitleInfo}>{overview}</Text>
                </ReadMore>
              </SectionRow>
              <SectionRow title="Main cast">
                <PersonListRow
                  data={cast}
                  type="character"
                  keyItem="creditId"
                  ListEmptyComponent={renderListEmpty}
                  onTeamDetail={handlePerson}
                  renderItem={renderItem}
                />
              </SectionRow>
              <SectionRow title="Main technical team">
                <PersonListRow
                  data={crew}
                  type="job"
                  keyItem="creditId"
                  ListEmptyComponent={renderListEmpty}
                  onTeamDetail={handlePerson}
                  renderItem={renderItem}
                />
              </SectionRow>
              <SectionRow title="Producer" isLast>
                <PersonListRow
                  data={productionCompanies}
                  type="production"
                  keyItem="id"
                  ListEmptyComponent={renderListEmpty}
                  onTeamDetail={handlePerson}
                  renderItem={renderItem}
                />
              </SectionRow>
            </View>
          </ScrollView>
        )}
        <PersonModal
          isVisible={isVisible}
          creditId={creditId}
          style={styles.bottomModal}
          onClose={handleVisibleModal}
        />
      </View>
    );
  }
};

MovieDetailsScreen.navigationOptions = ({ navigation }) => {
  const params = navigation.state.params || {};

  return {
    title: 'Movie details',
    headerRight: (
      <TouchableOpacity style={styles.buttonShare} onPress={params.handleShare}>
        <Feather name="share" size={23} color={darkBlue} />
      </TouchableOpacity>
    )
  };
};

export default MovieDetailsScreen;
