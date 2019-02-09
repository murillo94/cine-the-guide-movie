import React from 'react';
import { Switch } from 'react-native';

import { gray, darkBlue } from '../../styles/Colors';

const SwitchCustom = ({
  value = false,
  onValueChange = () => null,
  trackColor = { false: gray, true: darkBlue }
}) => (
  <Switch value={value} onValueChange={onValueChange} trackColor={trackColor} />
);

export { SwitchCustom as Switch }; // eslint-disable-line import/prefer-default-export
