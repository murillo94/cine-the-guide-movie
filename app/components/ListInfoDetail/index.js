import React from 'react';
import { ScrollView, Text } from 'react-native';

import SectionDetail from '../SectionDetail';

import styles from './styles';

const ListInfoDetail = ({ data = {} }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.container}
  >
    {Object.keys(data).map(key => (
      <SectionDetail key={key} title={key} hasSubTitle>
        <Text style={styles.description}>{data[key]}</Text>
      </SectionDetail>
    ))}
  </ScrollView>
);

export default ListInfoDetail;
