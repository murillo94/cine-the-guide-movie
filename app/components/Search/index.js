import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { TouchableOpacity } from '../TouchableOpacity';

import { darkGray } from '../../styles/Colors';

import styles from './styles';

export default class Search extends Component {
  state = {
    search: ''
  };

  actionClearSearch = () => {
    this.setState({ search: '' });
  };

  actionSubmit = () => {
    const { search } = this.state;
    const { navigate, typeRequest } = this.props;

    if (search) {
      navigate('SearchResults', {
        typeRequest,
        name: search,
        id: null
      });
    }
  };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <View style={styles.inputDirection}>
            <Feather
              style={styles.icon}
              name="search"
              size={20}
              color={darkGray}
            />
            <TextInput
              style={styles.textInput}
              onSubmitEditing={this.actionSubmit}
              onChangeText={search => this.setState({ search })}
              value={search}
              returnKeyType="search"
              keyboardType="default"
              blurOnSubmit={true}
              multiline={false}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholderTextColor={darkGray}
              placeholder="Search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={this.actionClearSearch}>
                <Feather
                  style={styles.icon}
                  name="x"
                  size={20}
                  color={darkGray}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
