import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TouchableOpacity } from '../../common/TouchableOpacity';

import { getResponsiveWidth } from '../../../utils/dimensions';

import { darkBlue } from '../../../utils/colors';

import styles from './styles';

const WIDTH = getResponsiveWidth(20);

const NotificationCard = ({
  style = styles.containerError,
  icon = 'alert-octagon',
  textError = 'Something wrong has happened, please try again later.',
  textButton = 'Load',
  onPress = null
}) => (
  <View style={style}>
    <Feather name={icon} size={WIDTH} color={darkBlue} />
    <Text style={styles.errorInfo}>{textError}</Text>
    {onPress && (
      <TouchableOpacity style={styles.loadingButton} onPress={onPress}>
        <Text style={styles.loadingText}>{textButton}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default NotificationCard;
