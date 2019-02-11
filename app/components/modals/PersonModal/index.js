import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import { Feather } from '@expo/vector-icons';
import Image from 'react-native-scalable-image';

import Spinner from '../../common/Spinner';
import NotificationCard from '../../cards/NotificationCard';
import { Modal } from '../Modal';
import { TouchableOpacity } from '../../common/TouchableOpacity';

import request from '../../../services/Api';

import { width } from '../../../utils/Metrics';
import { notFound } from '../../../utils/StaticImages';
import { darkBlue } from '../../../styles/Colors';

import styles from './styles';

const uninformed = 'Uninformed';

export default class PersonModal extends Component {
  state = {
    isLoading: false,
    isError: false,
    id: this.props.creditId
  };

  getImageApi = () => {
    const { profilePath } = this.state;

    return profilePath
      ? { uri: `https://image.tmdb.org/t/p/w500/${profilePath}` }
      : notFound;
  };

  getAge = () => {
    const { birthday } = this.state;

    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1;
      return `${age} years`;
    }
    return `${uninformed} age`;
  };

  requestTeamInfo = async () => {
    try {
      this.setState({ isLoading: true });

      const { creditId } = this.props;

      const data = await request(`person/${parseInt(creditId)}`);

      this.setState({
        isLoading: false,
        isError: false,
        id: creditId,
        profilePath: data.profile_path || '',
        name: data.name || `${uninformed} name`,
        knownForDepartment:
          data.known_for_department || `${uninformed} department`,
        birthday: data.birthday || '',
        placeOfBirth: data.place_of_birth || `${uninformed} place of birth`,
        biography: data.biography || uninformed
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  };

  renderFooter = () => {
    const { actionClose } = this.props;

    return (
      <View style={styles.containerRow}>
        <TouchableOpacity style={styles.button} onPress={actionClose}>
          <Feather
            name="chevron-down"
            size={styles.icon.fontSize}
            color={darkBlue}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      isLoading,
      isError,
      id,
      name,
      knownForDepartment,
      placeOfBirth,
      biography
    } = this.state;

    const { isVisible, actionClose, style, creditId } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        onModalShow={this.requestTeamInfo}
        actionOpenClose={actionClose}
        style={style}
      >
        <View style={styles.containerModal}>
          {isLoading || creditId !== id ? (
            <Spinner style={styles.containerCenter} />
          ) : isError ? (
            <View style={styles.containerModal}>
              <ScrollView style={styles.containerScroll}>
                <NotificationCard
                  icon="alert-octagon"
                  action={this.requestTeamInfo}
                />
              </ScrollView>
              {this.renderFooter()}
            </View>
          ) : (
            <View style={styles.containerModal}>
              <ScrollView style={styles.containerScroll}>
                <View style={styles.containerMainText}>
                  <Image
                    source={this.getImageApi()}
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
                        {knownForDepartment}
                      </Text>
                    </View>
                    <View style={styles.containerTitleMargin}>
                      <Text
                        numberOfLines={2}
                        style={[styles.textSmall, styles.textJustify]}
                      >
                        {this.getAge()}
                      </Text>
                    </View>
                    <View style={styles.containerTitleMargin}>
                      <Text
                        numberOfLines={2}
                        style={[styles.textSmall, styles.textJustify]}
                      >
                        {placeOfBirth}
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
              {this.renderFooter()}
            </View>
          )}
        </View>
      </Modal>
    );
  }
}
