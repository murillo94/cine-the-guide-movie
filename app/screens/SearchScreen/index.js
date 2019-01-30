import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';

import Search from '../../components/Search';

import genre from '../../assets/genre/ids.json';
import styles from './styles';

export default class SearchScreen extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Search typeRequest={'search'} navigate={navigate} />
        <ScrollView style={styles.containerList}>
          {Object.keys(genre).map(id => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.item}
              key={id}
              onPress={() =>
                navigate('SearchResults', {
                  typeRequest: 'discover',
                  name: genre[id].name,
                  id
                })
              }
            >
              <Text style={styles.itemText}>{genre[id].name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
