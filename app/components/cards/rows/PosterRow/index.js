import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import ImagesModal from '../../../modals/ImagesModal';
import { TouchableOpacity } from '../../../common/TouchableOpacity';

import { width } from '../../../../utils/dimensions';
import { getImageApi } from '../../../../utils/images';
import { getAvarageRating } from '../../../../utils/rating';

import { ROUTES } from '../../../../navigation/routes';

import { white } from '../../../../utils/colors';

import styles from './styles';

const PosterRow = ({
  title,
  backdropPath,
  voteAverage,
  images,
  video,
  showImage,
  onPress,
  navigate
}) => {
  handlePlayVideo = () => {
    const { key } = video;

    navigate(ROUTES.MOVIE_VIDEO, { key });
  };

  return (
    <View style={styles.containerMainPhoto}>
      <Image
        source={getImageApi(backdropPath)}
        style={styles.mainPhoto}
        resizeMode="cover"
      />
      {video && video.site === 'YouTube' && (
        <TouchableOpacity style={styles.play} onPress={handlePlayVideo}>
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
            {getAvarageRating(voteAverage).map(value => (
              <FontAwesome
                key={value}
                name="star"
                size={width * 0.06}
                color={white}
                style={styles.star}
              />
            ))}
          </View>
        </View>
      </TouchableOpacity>
      {images.length ? (
        <ImagesModal showImage={showImage} images={images} onClose={onPress} />
      ) : null}
    </View>
  );
};

export default PosterRow;
