import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { fontSizeResponsive } from './../config/Metrics';

export default class Search extends Component {
  state = {
    search: '',
  }

  actionClearSearch = () => {
    this.setState({search: ''});
  }
  
	render() {
    const { search } = this.state;
    const { navigate, typeRequest } = this.props;
    
  	return (
      <View style={styles.container}>
  		  <View style={styles.containerInput}>
          <View style={styles.inputDirection}>
            <Feather style={styles.icon} name="search" size={20} color='#a1a1a4' />
            <TextInput 
              style={styles.textInput} 
              onSubmitEditing={() => search.length > 0 && navigate('SearchResults', { typeRequest: typeRequest, name: search, id: null })} 
              onChangeText={(search) => this.setState({search})} 
              value={search} 
              returnKeyType="search" 
              keyboardType="default" 
              blurOnSubmit={true} 
              multiline={false} 
              autoCorrect={false} 
              underlineColorAndroid='transparent' 
              placeholderTextColor="#a1a1a4" 
              placeholder="Search" 
            />
            {search.length > 0 &&
              <TouchableOpacity activeOpacity={0.5} onPress={this.actionClearSearch}>
                <Feather style={styles.icon} name="x" size={20} color='#a1a1a4' />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
  	);
	}
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    paddingTop: 25,
    paddingBottom: 5,
  },
  containerInput: {
    height: 40,
    backgroundColor: '#f6f6f6',
    borderRadius: 15,
  },
  inputDirection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: fontSizeResponsive(2.2),
    color: '#47525E',
    width: '100%',
  },
});
