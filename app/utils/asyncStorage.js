import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key, item) => {
  const value = await AsyncStorage.getItem(key);
  const res = JSON.parse(value) || false;

  return !!res[item];
};

export const setItem = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};
