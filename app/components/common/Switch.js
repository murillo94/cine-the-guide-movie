import React from 'react';
import { Switch } from 'react-native';

import { gray, darkBlue } from '../../utils/colors';

const SwitchCustom = ({
  accessibilityLabel = '',
  value = false,
  onValueChange = () => null,
  trackColor = { false: gray, true: darkBlue },
}) => (
  <Switch
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="switch"
    value={value}
    onValueChange={onValueChange}
    trackColor={trackColor}
  />
);

export { SwitchCustom as Switch };
