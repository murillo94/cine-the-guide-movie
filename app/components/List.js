import React from 'react';
import { FlatList } from 'react-native';

import ListItem from './ListItem';

const renderItem = (item, type, isSearch, numColumns, navigate) => (
  <ListItem
    item={item}
    type={type}
    isSearch={isSearch}
    numColumns={numColumns}
    navigate={navigate}
  />
);

const List = ({
  data,
  type,
  isSearch,
  keyGrid,
  numColumns,
  refreshing,
  onRefresh,
  ListFooterComponent,
  ListEmptyComponent,
  navigate
}) => (
  <FlatList
    data={data}
    key={keyGrid}
    numColumns={numColumns}
    removeClippedSubviews={true}
    keyExtractor={item => item.id.toString()}
    refreshing={refreshing}
    onRefresh={onRefresh}
    ListFooterComponent={ListFooterComponent}
    ListEmptyComponent={ListEmptyComponent}
    renderItem={({ item }) =>
      renderItem(item, type, isSearch, numColumns, navigate)
    }
  />
);

export default List;
