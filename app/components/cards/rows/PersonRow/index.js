import React, { memo } from 'react';
import { View, Text } from 'react-native';

import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { Image } from '../../../common/Image';

import { getImageApi } from '../../../../utils/images';

import styles from './styles';

const uninformed = 'Uninformed';

const PersonRow = memo(
  ({ type, item, onTeamDetail }) => (
    <>
      {type === 'character' || type === 'job' ? (
        <TouchableOpacity
          style={styles.containerCast}
          onPress={() => onTeamDetail(item.id)}
        >
          {type === 'character' && (
            <Text
              numberOfLines={1}
              style={[styles.titleCast, styles.titleCharacter]}
            >
              {item.character || uninformed}
            </Text>
          )}
          {type === 'job' && (
            <Text
              numberOfLines={1}
              style={[styles.titleCast, styles.titleCharacter]}
            >
              {item.job || uninformed}
            </Text>
          )}
          <Image
            accessibilityLabel={`${item.character || item.job} image`}
            uri={getImageApi(item.profile_path)}
            style={styles.castPhoto}
          />
          <Text numberOfLines={1} style={styles.titleCast}>
            {item.name || uninformed}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.containerCast}>
          <Image
            accessibilityLabel={`${item.name} image`}
            resizeMode="contain"
            uri={getImageApi(item.logo_path)}
            style={styles.productionCompaniesPhoto}
          />
          <Text numberOfLines={2} style={styles.titleCast}>
            {item.name || uninformed}
          </Text>
        </View>
      )}
    </>
  ),
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);

export default PersonRow;
