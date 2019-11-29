import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TouchableOpacity } from '../TouchableOpacity';

import { darkGray } from '../../../styles/Colors';

import styles from './styles';

export default class Search extends Component {
  state = {
    value: ''
  };

  handleClearSearch = () => {
    this.setState({ value: '' });
  };

  handleSubmit = () => {
    const { value } = this.state;
    const { navigate, typeRequest } = this.props;

    if (value) {
      navigate('SearchResults', {
        typeRequest,
        name: value,
        id: null
      });
    }
  };

  render() {
    const { value } = this.state;

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
              onSubmitEditing={this.handleSubmit}
              onChangeText={search => this.setState({ value: search })}
              value={value}
              returnKeyType="search"
              keyboardType="default"
              blurOnSubmit
              multiline={false}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholderTextColor={darkGray}
              placeholder="Search"
            />
            {value.length > 0 && (
              <TouchableOpacity onPress={this.handleClearSearch}>
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
