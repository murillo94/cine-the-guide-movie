import {
  white,
  freeze,
  gray,
  lightGray,
  darkGray,
  blue,
  darkBlue,
  pink,
  lightRed,
  lightYellow,
  lightGreen
} from '../colors';

test('should verify the hex color', () => {
  expect(white).toBe('#ffffff');
  expect(freeze).toBe('#f6f6f6');
  expect(gray).toBe('#e9e9e9');
  expect(lightGray).toBe('#f0f0f0');
  expect(darkGray).toBe('#a1a1a4');
  expect(blue).toBe('#8190a5');
  expect(darkBlue).toBe('#47525e');
  expect(pink).toBe('#f95f62');
  expect(lightRed).toBe('#ff7f7f');
  expect(lightYellow).toBe('#eab079');
  expect(lightGreen).toBe('#82c596');
});

test('should verify the hex color contains #', () => {
  const expected = [expect.stringMatching(/^#/)];

  expect([
    white,
    freeze,
    gray,
    lightGray,
    darkGray,
    blue,
    darkBlue,
    pink,
    lightRed,
    lightYellow,
    lightGreen
  ]).toEqual(expect.arrayContaining(expected));
});
