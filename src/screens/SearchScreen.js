import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import Search from './../components/Search';
import { fontSizeResponsive } from './../config/Metrics';
import genre from './../assets/genre/genre_ids.json';

export default class SearchScreen extends Component {
  shouldComponentUpdate() {
    return false;
  }

  convertArray = () => {
    const list = [];
    for (let obj of Object.values([genre])) {
      for (let value of Object.values(obj)) {
        list.push({ name: value.name, id: value.id });
      }
    }
    return list;
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Search typeRequest={'search'} navigate={navigate} />
        <ScrollView style={styles.containerList}>
          {this.convertArray().map(x => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.item}
              key={x.id}
              onPress={() =>
                navigate('SearchResults', {
                  typeRequest: 'discover',
                  name: x.name,
                  id: x.id
                })
              }
            >
              <Text style={styles.itemText}>{x.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerList: {
    marginTop: 25
  },
  item: {
    alignItems: 'center',
    marginBottom: 25
  },
  itemText: {
    fontSize: fontSizeResponsive(2.5),
    color: '#47525E',
    textAlign: 'center'
  }
});
