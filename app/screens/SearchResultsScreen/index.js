import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import MovieListRow from '../../components/cards/rows/MovieListRow';
import MovieRow from '../../components/cards/rows/MovieRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import request from '../../services/Api';

import { getItem } from '../../utils/AsyncStorage';

import { darkBlue } from '../../styles/Colors';

import styles from './styles';

const SearchResultsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasAdultContent, setHasAdultContent] = useState(false);
  const [results, setResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [view, setView] = useState({ numColumns: 1, keyGrid: 1 });
  const { id, name, typeRequest } = navigation.state.params;

  useEffect(() => {
    (async () => {
      try {
        const adultContentStorage = await getItem(
          '@ConfigKey',
          'hasAdultContent'
        );

        setHasAdultContent(adultContentStorage);
        requestMoviesList();
      } catch (error) {
        requestMoviesList();
      }
    })();
  }, []);

  requestMoviesList = async () => {
    try {
      setIsLoading(true);

      const dateRelease = new Date().toISOString().slice(0, 10);
      const query =
        typeRequest === 'search'
          ? { query: `${name.trim()}` }
          : { with_genres: `${id}` };

      const data = await request(`${typeRequest}/movie`, {
        page,
        'release_date.lte': dateRelease,
        with_release_type: '1|2|3|4|5|6|7',
        include_adult: hasAdultContent,
        ...{ ...query }
      });

      setIsLoading(false);
      setIsLoadingMore(false);
      setIsError(false);
      setTotalPages(data.total_pages);
      setResult([...results, ...data.results]);
    } catch (err) {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsError(true);
    }
  };

  renderItem = (item, type, isSearch, numColumns, navigate) => (
    <MovieRow
      item={item}
      type={type}
      isSearch={isSearch}
      numColumns={numColumns}
      navigate={navigate}
    />
  );

  renderFooter = () => {
    if (isLoadingMore) return <Spinner size="small" />;

    if (totalPages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            onPress={actionLoadMore}
          >
            <Text style={styles.loadingText}>Load more</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (results.length > 0) return <View style={styles.loadingMore} />;

    return null;
  };

  actionLoadMore = async () => {
    await setIsLoadingMore(true);
    await setPage(page + 1);
    await requestMoviesList();
  };

  actionGrid = () => {
    const { numColumns, keyGrid } = view;

    setView({ numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1 });
  };

  const { navigate } = navigation;
  const { numColumns, keyGrid } = view;

  return (
    <View style={styles.container}>
      {isLoading && !isLoadingMore ? (
        <Spinner />
      ) : isError ? (
        <NotificationCard icon="alert-octagon" action={requestMoviesList} />
      ) : results.length === 0 ? (
        <NotificationCard
          icon="thumbs-down"
          textError="No results available."
        />
      ) : (
        <View style={styles.containerList}>
          {results.length > 0 && (
            <View style={styles.containerMainText}>
              <Text style={styles.textMain} numberOfLines={1}>
                {name}
              </Text>
              <TouchableOpacity
                style={[
                  styles.buttonGrid,
                  numColumns === 2 && styles.buttonGridActive
                ]}
                onPress={actionGrid}
              >
                <Feather name="grid" size={22} color={darkBlue} />
              </TouchableOpacity>
            </View>
          )}
          <MovieListRow
            data={results}
            type={name}
            isSearch={typeRequest === 'search'}
            keyGrid={keyGrid}
            numColumns={numColumns}
            refreshing={null}
            onRefresh={null}
            ListFooterComponent={renderFooter}
            navigate={navigate}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};

SearchResultsScreen.navigationOptions = () => ({
  title: 'Search result'
});

export default SearchResultsScreen;
