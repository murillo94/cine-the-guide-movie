import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Modal } from '../Modal';
import { TouchableOpacity } from '../../common/TouchableOpacity';
import { Switch } from '../../common/Switch';

import { darkBlue } from '../../../styles/colors';
import styles from './styles';

const FilterModal = ({ isVisible, filter, onVisible, onFilter, style }) => {
  const [filters, setFilters] = useState({
    type: filter.filterType,
    name: filter.filterName
  });
  const { type, name } = filters;

  changeValues = (type, name) => {
    setFilters({ type, name });
  };

  return (
    <Modal isVisible={isVisible} onClose={onVisible} style={style}>
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
                  value={type === 'release_date.desc'}
                  onValueChange={() =>
                    changeValues('release_date.desc', 'Releases')
                  }
                />
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  Old
                </Text>
                <Switch
                  value={type === 'release_date.asc'}
                  onValueChange={() => changeValues('release_date.asc', 'Old')}
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
                  value={type === 'popularity.desc'}
                  onValueChange={() =>
                    changeValues('popularity.desc', 'Most popular')
                  }
                />
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  Less popular
                </Text>
                <Switch
                  value={type === 'popularity.asc'}
                  onValueChange={() =>
                    changeValues('popularity.asc', 'Less popular')
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
                  value={type === 'revenue.desc'}
                  onValueChange={() =>
                    changeValues('revenue.desc', 'Higher revenue')
                  }
                />
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  Lowest revenue
                </Text>
                <Switch
                  value={type === 'revenue.asc'}
                  onValueChange={() =>
                    changeValues('revenue.asc', 'Lowest revenue')
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onVisible}
          >
            <Feather
              name="chevron-down"
              size={styles.icon.fontSize}
              color={darkBlue}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={() => onFilter(type, name, false)}
          >
            <Text style={[styles.buttonText, styles.buttonTextSave]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
