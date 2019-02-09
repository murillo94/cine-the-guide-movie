import React from 'react';
import { FlatList } from 'react-native';

const ListTeam = ({
  data,
  type,
  keyItem,
  ListEmptyComponent,
  actionTeamDetail,
  renderItem
}) => (
  <FlatList
    data={data}
    horizontal
    showsHorizontalScrollIndicator={false}
    removeClippedSubviews
    keyExtractor={item =>
      keyItem === 'creditId' ? item.credit_id.toString() : item.id.toString()
    }
    ListEmptyComponent={ListEmptyComponent}
    renderItem={({ item }) => renderItem(item, type, actionTeamDetail)}
  />
);

export default ListTeam;
