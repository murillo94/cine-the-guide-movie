import React, { Component } from 'react';
import {
  AsyncStorage,
  Share,
  Platform,
  Linking,
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Switch,
  TouchableOpacity
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import { fontSizeResponsive } from './../config/Metrics';

export default class ConfigurationScreen extends Component {
  state = {
    hasAdultContent: false
  };

  /*shouldComponentUpdate() {
    return false;
  }*/

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
                Version 1.0.0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 25
  },
  section: {
    marginBottom: 40
  },
  sectionText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: fontSizeResponsive(3)
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  itemText: {
    fontSize: fontSizeResponsive(2.5),
    color: '#47525E',
    width: '80%'
  },
  itemTextVersion: {
    fontSize: fontSizeResponsive(2.5),
    color: '#8190A5'
  },
  itemNoBorder: {
    borderBottomWidth: 0
  },
  icon: {
    marginRight: 5
  }
});
