import React from 'react';
import { ScrollView, Text } from 'react-native';

import SectionRow from '../SectionRow';

import styles from './styles';

const MainInfoRow = ({ data = {} }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.container}
  >
    {Object.keys(data).map((key) => (
      <SectionRow key={key} title={key} hasSubTitle>
        <Text style={styles.description}>{data[key]}</Text>
      </SectionRow>
    ))}
  </ScrollView>
);

export default MainInfoRow;
