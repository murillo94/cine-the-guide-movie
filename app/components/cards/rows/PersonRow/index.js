import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';

import { TouchableOpacity } from '../../../common/TouchableOpacity';

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
            source={getImageApi(item.profile_path)}
            style={styles.castPhoto}
          />
          <Text numberOfLines={1} style={styles.titleCast}>
            {item.name || uninformed}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.containerCast}>
          <Image
            source={getImageApi(item.logo_path)}
            style={styles.productionCompaniesPhoto}
            resizeMode="contain"
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
