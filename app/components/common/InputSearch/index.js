import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TouchableOpacity } from '../TouchableOpacity';

import { ROUTES } from '../../../navigation/routes';

import { darkGray } from '../../../utils/colors';

import styles from './styles';

const InputSearch = ({ navigate, typeRequest }) => {
  const [search, setSearch] = useState('');

  onChangeSearch = value => {
    setSearch(value);
  };

  handleClearSearch = () => {
    setSearch('');
  };

  handleSubmit = () => {
    if (search) {
      navigate(ROUTES.SEARCH_RESULTS, {
        typeRequest,
        name: search
      });
    }
  };

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
            onSubmitEditing={handleSubmit}
            onChangeText={value => onChangeSearch(value)}
            value={search}
            returnKeyType="search"
            keyboardType="default"
            blurOnSubmit
            multiline={false}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholderTextColor={darkGray}
            placeholder="Search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
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
};

export default InputSearch;
