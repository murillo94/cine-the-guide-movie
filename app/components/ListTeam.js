import React from 'react';
import { FlatList } from 'react-native';

import ListItemTeam from './ListItemTeam';

const renderItem = (item, type, actionTeamDetail) => (
  <ListItemTeam item={item} type={type} actionTeamDetail={actionTeamDetail} />
);

const ListTeam = ({
  data,
  type,
  keyItem,
  ListEmptyComponent,
  actionTeamDetail
}) => (
  <FlatList
    data={data}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    removeClippedSubviews={true}
    keyExtractor={item =>
      keyItem === 'credit_id' ? item.credit_id.toString() : item.id.toString()
    }
    ListEmptyComponent={ListEmptyComponent}
    renderItem={({ item }) => renderItem(item, type, actionTeamDetail)}
  />
);

export default ListTeam;
