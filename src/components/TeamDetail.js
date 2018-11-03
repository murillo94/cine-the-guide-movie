import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Image from 'react-native-scalable-image';

import { Spinner } from './Spinner';
import { Error } from './Error';

import { fontSizeResponsive, height, width } from './../config/Metrics';

export default class TeamDetail extends Component {
  state = {
    isLoading: false,
    isError: false
  };

  componentDidMount() {
    this.requestTeamInfo();
  }

  getImageApi(image) {
    image = image || '';
    return image !== ''
      ? { uri: `https://image.tmdb.org/t/p/w500/${image}` }
      : require('./../assets/images/not_found.png');
  }

  getAge(birthday) {
    birthday = birthday || '';

    if (birthday !== '') {
      var today = new Date();
      var birthDate = new Date(birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return `${age} years`;
    }
    return 'Uninformed age';
  }

  requestTeamInfo = async () => {
    const { credit_id } = this.props;

    try {
      this.setState({ isLoading: true });

      let response = await fetch(
        `https://api.themoviedb.org/3/person/${parseInt(
          credit_id
        )}?api_key=024d69b581633d457ac58359146c43f6&language=en-US`
      );
      let data = await response.json();

      this.setState({
        isLoading: false,
        isError: false,
        profile_path: data.profile_path || '',
        name: data.name || 'Uninformed name',
        known_for_department:
          data.known_for_department || 'Uninformed department',
        birthday: data.birthday || '',
        place_of_birth: data.place_of_birth || 'Uninformed place of birth',
        biography: data.biography || 'Uninformed'
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  };

  render() {
    const { actionClose } = this.props;
    const {
      isLoading,
      isError,
      profile_path,
      name,
      known_for_department,
      birthday,
      place_of_birth,
      biography
    } = this.state;

    return (
      <View style={styles.containerModal}>
        {isLoading ? (
          <Spinner style={styles.containerCenter} />
        ) : isError ? (
          <View style={styles.containerModal}>
            <ScrollView style={styles.containerScroll}>
              <Error icon="alert-octagon" action={this.requestTeamInfo} />
            </ScrollView>
            <View style={styles.containerRow}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={actionClose}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.containerModal}>
            <ScrollView style={styles.containerScroll}>
              <View style={styles.containerMainText}>
                <Image
                  source={this.getImageApi(profile_path)}
                  style={styles.photo}
                  width={width * 0.33}
                />
                <View style={styles.textItens}>
                  <Text style={styles.titleName}>{name}</Text>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}
                    >
                      {known_for_department}
                    </Text>
                  </View>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}
                    >
                      {this.getAge(birthday)}
                    </Text>
                  </View>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}
                    >
                      {place_of_birth}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.titleInfo}>Biography</Text>
              <Text
                style={[
                  styles.textSmall,
                  styles.textLineHeight,
                  styles.textJustify
                ]}
              >
                {biography}
              </Text>
            </ScrollView>
            <View style={styles.containerRow}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={actionClose}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: height * 0.7
  },
  containerScroll: {
    padding: 22,
    paddingTop: 0,
    marginTop: 22
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  photo: {
    borderRadius: 8
  },
  containerMainText: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  titleInfo: {
    fontSize: fontSizeResponsive(2.4),
    fontWeight: 'bold',
    color: '#47525E',
    marginBottom: 7
  },
  titleName: {
    fontSize: fontSizeResponsive(2.6),
    fontWeight: 'bold',
    color: '#47525E',
    marginBottom: 10
  },
  textItens: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textSmall: {
    fontSize: fontSizeResponsive(2.1),
    color: '#8190A5'
  },
  textJustify: {
    textAlign: 'justify'
  },
  textLineHeight: {
    lineHeight: 20
  },
  containerTitleMargin: {
    marginBottom: 7
  },
  containerRow: {
    padding: 22
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#47525E',
    padding: 10,
    borderRadius: 100,
    width: '100%'
  },
  buttonText: {
    fontSize: fontSizeResponsive(2.1),
    textAlign: 'center',
    color: '#47525E'
  }
});
