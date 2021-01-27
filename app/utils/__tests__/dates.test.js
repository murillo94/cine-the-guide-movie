import { convertToYear, convertToDate, getTodayDate } from '../dates';

describe('convert year', () => {
  const mockDate = new Date(1466424490000);
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  test('should convert year', () => {
    expect(convertToYear(1466424490000)).toBe(2016);
  });
});

describe('convert date', () => {
  const mockDate = new Date(1466424490000);
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  test('should convert date', () => {
    expect(convertToDate(1466424490000)).toBe('21/6/2016');
  });
});

describe('get today date', () => {
  const mockDate = new Date(1466424490000);
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  test('should return today date', () => {
    expect(getTodayDate()).toBe('2016-06-20');
  });
});
