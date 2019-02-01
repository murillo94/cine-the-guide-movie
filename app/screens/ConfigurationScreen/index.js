import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Text } from 'react-native';

import { Constants } from 'expo';
import { Feather } from '@expo/vector-icons';

import { Alert } from '../../components/Alert';
import { Share } from '../../components/Share';
import { TouchableOpacity } from '../../components/TouchableOpacity';
import { Switch } from '../../components/Switch';

import { darkBlue } from '../../styles/Colors';

import styles from './styles';

export default class ConfigurationScreen extends Component {
  state = {
    hasAdultContent: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.hasAdultContent !== nextState.hasAdultContent) return true;
    return false;
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('@ConfigKey');

      if (value) {
        const arr = JSON.parse(value);

        this.setState({
          hasAdultContent: arr.hasAdultContent
        });
      }
    } catch (error) {
      this.showError();
    }
  }

  showError = () => {
    Alert({
      title: 'Attention',
      description: 'Something wrong has happened, please try again later.'
    });
  };

  actionChangeAdultContent = async value => {
    try {
      this.setState({ hasAdultContent: value });
      await AsyncStorage.setItem('@ConfigKey', `{"hasAdultContent": ${value}}`);
    } catch (error) {
      this.showError();
    }
  };

  actionShare = () => {
    Share({
      message: 'Learn all about movies and series \u{1F37F}',
      url: 'https://www.themoviedb.org/',
      title: 'AmoCinema',
      dialogTitle: 'Learn all about movies and series \u{1F37F}'
    });
  };

  actionRating = () => {
    Alert({
      title: 'Attention',
      description:
        'Nothing happens now. In the future you will be redirected to store.'
    });
  };

  render() {
    const { hasAdultContent } = this.state;

    return (
      <ScrollView style={styles.bgWhite}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text
              style={[styles.itemText, styles.sectionText]}
              numberOfLines={2}
            >
              Interface
            </Text>
            <View style={[styles.item, styles.itemNoBorder]}>
              <Text style={styles.itemText} numberOfLines={2}>
                Include adult content
              </Text>
              <Switch
                value={hasAdultContent}
                onValueChange={this.actionChangeAdultContent}
              />
            </View>
          </View>
          <View>
            <Text
              style={[styles.itemText, styles.sectionText]}
              numberOfLines={2}
            >
              Application
            </Text>
            <TouchableOpacity onPress={this.actionShare}>
              <View style={styles.item}>
                <Text style={styles.itemText} numberOfLines={2}>
                  Tell a friend
                </Text>
                <Feather
                  name="share"
                  size={22}
                  color={darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.actionRating}>
              <View style={styles.item}>
                <Text style={styles.itemText} numberOfLines={2}>
                  Rate the app
                </Text>
                <Feather
                  name="star"
                  size={22}
                  color={darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View style={[styles.item, styles.itemNoBorder]}>
              <Text style={styles.itemTextVersion} numberOfLines={2}>
                Version {Constants.manifest.version}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
