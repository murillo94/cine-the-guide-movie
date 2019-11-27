import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import Search from '../../components/common/Search';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import genre from '../../assets/genre/ids.json';

import styles from './styles';

const SearchScreen = ({ navigation }) => {
  const { navigate } = navigation;

  handleSearch = id => {
    navigate('SearchResults', {
      typeRequest: 'discover',
      name: genre[id].name,
      id
    });
  };

  return (
    <View style={styles.container}>
      <Search typeRequest="search" navigate={navigate} />
      <ScrollView style={styles.containerList}>
        {Object.keys(genre).map(id => (
          <TouchableOpacity
            style={styles.item}
            key={id}
            onPress={() => handleSearch(id)}
          >
            <Text style={styles.itemText}>{genre[id].name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
