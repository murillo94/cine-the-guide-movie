import React, { Component } from 'react';
import { ActivityIndicator, Platform, StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import Image from 'react-native-scalable-image';

import { fontSizeResponsive, height, width } from './../config/Metrics';

export default class TeamDetail extends Component {
  state = {
    isLoading: true,
    isError: false,
  }

  componentDidMount() {
    this.requestTeamInfo();
  }

  getImageApi(image) {
    image = image || '';
    return image !== '' ? {uri: `https://image.tmdb.org/t/p/w500/${image}`} : require('./../assets/images/not_found.png');
  }

  getAge(birthday) {
    birthday = birthday || '';

    if(birthday !== '') {
      var today = new Date();
      var birthDate = new Date(birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return `${age} years`;
    }
    return '';
  }

  async requestTeamInfo() {
    const { credit_id } = this.props;

    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/person/${parseInt(credit_id)}?api_key=024d69b581633d457ac58359146c43f6&language=en-US`
      );
      let data = await response.json();

      this.setState({
        isLoading: false,
        isError: false,
        profile_path: data.profile_path || '',
        name: data.name || 'Uninformed',
        known_for_department: data.known_for_department || 'Uninformed',
        birthday: data.birthday || '',
        place_of_birth: data.place_of_birth || 'Uninformed',
        biography: data.biography || 'Uninformed',     
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true,
      }); 
    }
  }

  render() {
    const { actionClose } = this.props;
    const { isLoading, isError, profile_path, name, known_for_department, birthday, place_of_birth, biography } = this.state;

    if(isLoading) {
      return (
        <View style={styles.containerModal}>
          <View style={styles.containerCenter}>
            {Platform.OS === 'ios' ? 
              <ActivityIndicator size='small' color="#47525E" />
            :
              <ActivityIndicator size={50} color="#47525E" />
            }
          </View>
        </View>
      )
    }

    if(isError) {
      return (
        <View style={styles.containerModal}>
          <View style={styles.containerCenter}>
            <Feather name="alert-octagon" size={width * 0.2} color="#47525E" />
            <Text style={styles.errorInfo}>
              Something wrong has happened, please try again later.
            </Text>
          </View>
        </View>
      )
    }

    if(!isLoading && !isError) {
      return (
        <View style={styles.containerModal}>
          <ScrollView style={styles.containerScroll}>
            <View style={styles.containerMainText}>
              <Image source={this.getImageApi(profile_path)} 
              style={styles.photo} width={width * 0.33} />
              <View style={styles.textItens}>
                <Text style={styles.titleName}>
                  {name}
                </Text>
                <View style={styles.containerTitleMargin}>
                  <Text style={[styles.textSmall, styles.titleMargin]}>
                    Known For:
                  </Text>
                  <Text numberOfLines={2} style={[styles.textSmall, styles.textJustify]}>
                    {known_for_department}
                  </Text>
                </View>
                <View style={styles.containerTitleMargin}>
                  <Text style={[styles.textSmall, styles.titleMargin]}>
                    Age:
                  </Text>
                  <Text numberOfLines={2} style={[styles.textSmall, styles.textJustify]}>
                    {this.getAge(birthday)}
                  </Text>
                </View>
                <View style={styles.containerTitleMargin}>
                  <Text style={[styles.textSmall, styles.titleMargin]}>
                    Birthday:
                  </Text>
                  <Text numberOfLines={2} style={[styles.textSmall, styles.textJustify]}>
                    {place_of_birth}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.titleInfo}>
              Biography
            </Text>
            <Text style={[styles.textSmall, styles.textLineHeight, styles.textJustify]}>
              {biography}
            </Text>
          </ScrollView>
          <View style={styles.containerRow}>
            <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={actionClose}>
              <Text style={styles.buttonText}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: height * 0.7,
  },
  containerScroll: {
    padding: 22,
    paddingTop: 0,
    marginTop: 22,
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  photo: {
    borderRadius: 8,
  },
  containerMainText: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleInfo: {
    fontSize: fontSizeResponsive(2.4),
    fontWeight: 'bold',
    color: '#47525E',
    marginBottom: 7,
  },
  titleName: {
    fontSize: fontSizeResponsive(2.6),
    fontWeight: 'bold',
    color: '#47525E',
    marginBottom: 10,
  },
  textItens: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  textSmall: {
    fontSize: fontSizeResponsive(2.1),
    color: '#8190A5',
  },
  titleMargin: {
    marginBottom: 2,
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLineHeight: {
    lineHeight: 20,
  },
  containerTitleMargin: {
    marginBottom: 7,
  },
  containerRow: {
    padding: 22,
  },
  button: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#47525E',
    padding: 10,
    borderRadius: 100,
    width: '100%',
  },
  buttonText: {
    fontSize: fontSizeResponsive(2.1),
    textAlign: 'center',
    color: '#47525E',
  },
  errorInfo: {
    fontSize: fontSizeResponsive(2.6),
    color: '#8190A5',
    textAlign: 'center',
    padding: 25,
  },
});
