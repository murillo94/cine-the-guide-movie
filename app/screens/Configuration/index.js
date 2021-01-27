import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Screen from '../../components/common/Screen';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import { Switch } from '../../components/common/Switch';

import { getItem, setItem } from '../../utils/asyncStorage';

import { darkBlue } from '../../utils/colors';

import styles from './styles';

const Configuration = () => {
  const [hasAdultContent, setHasAdultContent] = useState(false);

  const showError = () => {
    Alert({
      title: 'Attention',
      description: 'Something wrong has happened, please try again later.'
    });
  };

  const handleChangeAdultContent = async (value) => {
    try {
      setHasAdultContent(value);
      await setItem('@ConfigKey', `{"hasAdultContent": ${value}}`);
    } catch (error) {
      showError();
    }
  };

  const handleShare = () => {
    Share({
      message: 'Learn all about movies and series \u{1F37F}',
      url: 'https://www.themoviedb.org/',
      title: 'AmoCinema',
      dialogTitle: 'Learn all about movies and series \u{1F37F}'
    });
  };

  const handleRating = () => {
    Alert({
      title: 'Attention',
      description:
        'Nothing happens now. In the future you will be redirected to store.'
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const adultContentStorage = await getItem(
          '@ConfigKey',
          'hasAdultContent'
        );

        setHasAdultContent(adultContentStorage);
      } catch (error) {
        showError();
      }
    })();
  }, [hasAdultContent]);

  return (
    <Screen>
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
                accessibilityLabel="Include adult content"
                value={hasAdultContent}
                onValueChange={handleChangeAdultContent}
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
            <TouchableOpacity onPress={handleShare}>
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
            <TouchableOpacity onPress={handleRating}>
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
    </Screen>
  );
};

export default Configuration;
