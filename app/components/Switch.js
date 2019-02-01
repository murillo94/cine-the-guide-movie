import React from 'react';
import { Switch } from 'react-native';

const SwitchCustom = ({
  value = false,
  onValueChange = () => null,
  trackColor = { false: '#e9e9e9', true: '#47525E' }
}) => (
  <Switch value={value} onValueChange={onValueChange} trackColor={trackColor} />
);

export { SwitchCustom as Switch };
