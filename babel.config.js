/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'react-native-vector-icons': '@expo/vector-icons'
          }
        }
      ]
    ]
  };
};
