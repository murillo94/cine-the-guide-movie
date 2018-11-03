import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity
} from 'react-native';

import { fontSizeResponsive, height } from './../config/Metrics';

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
                  onTintColor="#47525E"
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
                  onTintColor="#47525E"
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
                  onTintColor="#47525E"
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
                  onTintColor="#47525E"
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
                  onTintColor="#47525E"
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
                  onTintColor="#47525E"
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
            activeOpacity={0.5}
            style={[styles.button, styles.buttonClose]}
            onPress={actionFilter}
          >
            <Text style={[styles.buttonText, styles.buttonTextClose]}>
              Close
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.buttonSave]}
            onPress={() => actionSwitchMovie(filter, name, false)}
          >
            <Text style={[styles.buttonText, styles.buttonTextSave]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: 22
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: fontSizeResponsive(2.5),
    fontWeight: 'bold',
    color: '#47525E',
    padding: 22,
    paddingBottom: 18
  },
  containerSection: {
    marginBottom: 25
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    paddingLeft: 10,
    paddingRight: 10
  },
  optionSectionTitle: {
    fontSize: fontSizeResponsive(2.4),
    color: '#47525E',
    fontWeight: 'bold',
    width: '100%'
  },
  optionTitle: {
    fontSize: fontSizeResponsive(2.3),
    color: '#47525E',
    width: '80%'
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 22
  },
  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
    width: '45%'
  },
  buttonClose: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#47525E'
  },
  buttonSave: {
    backgroundColor: '#47525E'
  },
  buttonText: {
    fontSize: fontSizeResponsive(2.1),
    textAlign: 'center'
  },
  buttonTextSave: {
    color: '#fff',
    fontWeight: 'bold'
  },
  buttonTextClose: {
    color: '#47525E'
  }
});
