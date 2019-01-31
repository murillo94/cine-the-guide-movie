import { Alert } from 'react-native';

const AlertCustom = ({ title, description }) =>
  Alert.alert(title, description, [], { cancelable: true });

export { AlertCustom as Alert };
