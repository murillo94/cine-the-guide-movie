import React from 'react';
import { View, Text, Image } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import ImagesModal from '../modals/ImagesModal';
import { TouchableOpacity } from '../common/TouchableOpacity';

import { width } from '../../utils/Metrics';
import { white } from '../../styles/Colors';

import styles from './styles';

getImageApi = backdropPath => {
  return backdropPath
    ? { uri: `https://image.tmdb.org/t/p/w500/${backdropPath}` }
    : require('../../assets/images/not_found.png'); // eslint-disable-line global-require
};

convertRatingToStars = voteAverage => {
  const average = voteAverage > 5 ? Math.round(voteAverage) : voteAverage;
  const length =
    average !== 10 ? parseInt(`${average}`.charAt(0)) - 5 : average - 5;
  return average <= 5
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

actionPlayVideo = (video, navigate) => {
  const { key } = video;

  navigate('WebView', { key });
};

const PosterDetail = ({
  title,
  backdropPath,
  voteAverage,
  images,
  video,
  showImage,
  onPress,
  navigate
}) => (
  <View style={styles.containerMainPhoto}>
    <Image
      source={getImageApi(backdropPath)}
      style={styles.mainPhoto}
      resizeMode="cover"
    />
    {video && video.site === 'YouTube' && (
      <TouchableOpacity
        style={styles.play}
        onPress={() => actionPlayVideo(video, navigate)}
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
      onPress={images.length ? onPress : null}
    >
      <View style={styles.containerBackgroundPhotoInfo}>
        <Text numberOfLines={2} style={styles.photoInfo}>
          {title}
        </Text>
        <View style={styles.photoStar}>
          {convertRatingToStars(voteAverage)}
        </View>
      </View>
    </TouchableOpacity>
    {images.length ? (
      <ImagesModal
        showImage={showImage}
        images={images}
        actionClose={onPress}
      />
    ) : null}
  </View>
);

export default PosterDetail;
