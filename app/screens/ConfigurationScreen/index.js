import React, { Component } from 'react';
import {
  AsyncStorage,
  Share,
  Platform,
  Linking,
  Alert,
  ScrollView,
  View,
  Text,
  Switch,
  TouchableOpacity
} from 'react-native';
import { Constants } from 'expo';

import { Feather } from '@expo/vector-icons';

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
      if (value !== null) {
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
    Alert.alert(
      'Attention',
      'Something wrong has happened, please try again later.',
      [],
      { cancelable: true }
    );
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
    Share.share(
      {
        message: 'Learn all about movies and series \u{1F37F}',
        url: 'https://www.themoviedb.org/',
        title: 'AmoCinema'
      },
      {
        dialogTitle: 'Learn all about movies and series \u{1F37F}'
      }
    );
  };

  actionRating = () => {
    const url =
      Platform.OS == 'ios'
        ? 'https://itunes.apple.com/br/app/adorocinema/id926254990?mt=8'
        : 'https://play.google.com/store/apps/details?id=com.adorocinema.android&hl=pt_BR';

    Linking.openURL(url).catch(err => this.showError());
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
                onValueChange={this.actionChangeAdultContent}
                value={hasAdultContent}
                trackColor={{ false: '#e9e9e9', true: '#47525E' }}
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
            <TouchableOpacity activeOpacity={0.5} onPress={this.actionShare}>
              <View style={styles.item}>
                <Text style={styles.itemText} numberOfLines={2}>
                  Tell a friend
                </Text>
                <Feather
                  name="share"
                  size={22}
                  color="#47525E"
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.actionRating}>
              <View style={styles.item}>
                <Text style={styles.itemText} numberOfLines={2}>
                  Rate the app
                </Text>
                <Feather
                  name="star"
                  size={22}
                  color="#47525E"
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
