import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import styles from './styles';

export default class Search extends Component {
  state = {
    search: ''
  };

  actionClearSearch = () => {
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;
    const { navigate, typeRequest } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <View style={styles.inputDirection}>
            <Feather
              style={styles.icon}
              name="search"
              size={20}
              color="#a1a1a4"
            />
            <TextInput
              style={styles.textInput}
              onSubmitEditing={() =>
                search.length > 0 &&
                navigate('SearchResults', {
                  typeRequest: typeRequest,
                  name: search,
                  id: null
                })
              }
              onChangeText={search => this.setState({ search })}
              value={search}
              returnKeyType="search"
              keyboardType="default"
              blurOnSubmit={true}
              multiline={false}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholderTextColor="#a1a1a4"
              placeholder="Search"
            />
            {search.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.actionClearSearch}
              >
                <Feather
                  style={styles.icon}
                  name="x"
                  size={20}
                  color="#a1a1a4"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
