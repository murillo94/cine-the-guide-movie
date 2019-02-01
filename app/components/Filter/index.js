import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Modal } from '../Modal';
import { TouchableOpacity } from '../TouchableOpacity';
import { Switch } from '../Switch';

import styles from './styles';

export default class Filter extends Component {
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

    return (
      <Modal
        isVisible={this.props.isVisible}
        actionOpenClose={actionFilter}
        style={this.props.style}
      >
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
                    value={filter === 'release_date.desc' ? true : false}
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
                    value={filter === 'release_date.asc' ? true : false}
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
                    value={filter === 'popularity.desc' ? true : false}
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
                    value={filter === 'popularity.asc' ? true : false}
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
                    value={filter === 'revenue.desc' ? true : false}
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
                    value={filter === 'revenue.asc' ? true : false}
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
                color="#47525E"
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
