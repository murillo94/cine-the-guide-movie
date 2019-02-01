import React, { Component } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Modal } from '../Modal';
import { TouchableOpacity } from '../TouchableOpacity';

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
                    trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                    onValueChange={() =>
                      this.changeValues('release_date.desc', 'Releases')
                    }
                    value={filter === 'release_date.desc' ? true : false}
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Old
                  </Text>
                  <Switch
                    trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                    onValueChange={() =>
                      this.changeValues('release_date.asc', 'Old')
                    }
                    value={filter === 'release_date.asc' ? true : false}
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
                    trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                    onValueChange={() =>
                      this.changeValues('popularity.desc', 'Most popular')
                    }
                    value={filter === 'popularity.desc' ? true : false}
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Less popular
                  </Text>
                  <Switch
                    trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                    onValueChange={() =>
                      this.changeValues('popularity.asc', 'Less popular')
                    }
                    value={filter === 'popularity.asc' ? true : false}
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
                    trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                    onValueChange={() =>
                      this.changeValues('revenue.desc', 'Higher revenue')
                    }
                    value={filter === 'revenue.desc' ? true : false}
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Lowest revenue
                  </Text>
                  <Switch
                    trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                    onValueChange={() =>
                      this.changeValues('revenue.asc', 'Lowest revenue')
                    }
                    value={filter === 'revenue.asc' ? true : false}
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
