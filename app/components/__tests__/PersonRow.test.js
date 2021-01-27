import React from 'react';
import { render } from '@testing-library/react-native';

import PersonRow from '../cards/rows/PersonRow';

const props = {
  item: {
    profile_path: '',
    poster_path: '',
    name: 'Title',
    character: 'Character',
    job: 'Job'
  }
};

test('should verify if has default values in character mode', () => {
  const { getAllByA11yRole, getByText } = render(
    <PersonRow {...props} type="character" />
  );
  const image = getAllByA11yRole('imagebutton');
  const name = getByText(props.item.name);
  const character = getByText(props.item.character);

  expect(image).toHaveLength(1);
  expect(name).toBeTruthy();
  expect(character).toBeTruthy();
});

test('should verify if has default values in production mode', () => {
  const { getAllByA11yRole, getByText } = render(
    <PersonRow {...props} type="job" />
  );
  const image = getAllByA11yRole('imagebutton');

  expect(image).toHaveLength(1);
  const name = getByText(props.item.name);
  const job = getByText(props.item.job);

  expect(image).toHaveLength(1);
  expect(name).toBeTruthy();
  expect(job).toBeTruthy();
});

test('should verify if has default values in default mode', () => {
  const { getAllByA11yRole, queryByText } = render(<PersonRow {...props} />);
  const image = getAllByA11yRole('image');

  expect(image).toHaveLength(1);
  const name = queryByText(props.item.name);
  const character = queryByText(props.item.character);
  const job = queryByText(props.item.job);

  expect(image).toHaveLength(1);
  expect(name).toBeTruthy();
  expect(character).not.toBeTruthy();
  expect(job).not.toBeTruthy();
});
