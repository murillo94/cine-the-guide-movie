import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Modal } from '../Modal';
import { TouchableOpacity } from '../../common/TouchableOpacity';
import { Switch } from '../../common/Switch';

import { darkBlue } from '../../../styles/Colors';

import styles from './styles';

export default class FilterModal extends Component {
  state = {
    filter: this.props.filterType,
    name: this.props.filterName,
    actionFilter: this.props.actionFilter,
    actionSwitchMovie: this.props.actionSwitchMovie
  };

  changeValues = (filter, name) => {
    this.setState({ filter, name });
  };

  render() {
    const { filter, name, actionFilter, actionSwitchMovie } = this.state;
    const { isVisible, style } = this.props;

    return (
      <Modal isVisible={isVisible} actionOpenClose={actionFilter} style={style}>
        <View style={styles.containerModal}>
          <Text style={styles.modalTitle}>Filter</Text>
          <ScrollView>
            <View style={styles.containerScroll}>
              <View style={styles.containerSection}>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Date
                </Text>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Releases
                  </Text>
                  <Switch
                    value={filter === 'release_date.desc'}
                    onValueChange={() =>
                      this.changeValues('release_date.desc', 'Releases')
                    }
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Old
                  </Text>
                  <Switch
                    value={filter === 'release_date.asc'}
                    onValueChange={() =>
                      this.changeValues('release_date.asc', 'Old')
                    }
                  />
                </View>
              </View>
              <View style={styles.containerSection}>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Popularity
                </Text>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Most popular
                  </Text>
                  <Switch
                    value={filter === 'popularity.desc'}
                    onValueChange={() =>
                      this.changeValues('popularity.desc', 'Most popular')
                    }
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Less popular
                  </Text>
                  <Switch
                    value={filter === 'popularity.asc'}
                    onValueChange={() =>
                      this.changeValues('popularity.asc', 'Less popular')
                    }
                  />
                </View>
              </View>
              <View>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Revenue
                </Text>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Higher revenue
                  </Text>
                  <Switch
                    value={filter === 'revenue.desc'}
                    onValueChange={() =>
                      this.changeValues('revenue.desc', 'Higher revenue')
                    }
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Lowest revenue
                  </Text>
                  <Switch
                    value={filter === 'revenue.asc'}
                    onValueChange={() =>
                      this.changeValues('revenue.asc', 'Lowest revenue')
                    }
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={actionFilter}
            >
              <Feather
                name="chevron-down"
                size={styles.icon.fontSize}
                color={darkBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={() => actionSwitchMovie(filter, name, false)}
            >
              <Text style={[styles.buttonText, styles.buttonTextSave]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
