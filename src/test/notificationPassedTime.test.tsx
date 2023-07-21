import extractDateTime from '../utils/notificationPassedTime';

describe('extractDateTime', () => {
  test('should return the time difference in years', () => {
    const currentDate = new Date().getTime();
    const pastDate = new Date(currentDate - 2 * 365 * 24 * 60 * 60 * 1000);
    const result = extractDateTime(pastDate);
    expect(result).toBe('2y ago');
  });

  test('should return the time difference in months', () => {
    const currentDate = new Date().getTime();
    const pastDate = new Date(currentDate - 2 * 30 * 24 * 60 * 60 * 1000);
    const result = extractDateTime(pastDate);
    expect(result).toBe('2m ago');
  });

  test('should return the time difference in days', () => {
    const currentDate = new Date().getTime();
    const pastDate = new Date(currentDate - 2 * 24 * 60 * 60 * 1000);
    const result = extractDateTime(pastDate);
    expect(result).toBe('2d ago');
  });

  test('should return the time difference in hours', () => {
    const currentDate = new Date().getTime();
    const pastDate = new Date(currentDate - 2 * 60 * 60 * 1000);
    const result = extractDateTime(pastDate);
    expect(result).toBe('2h ago');
  });

  test('should return the time difference in minutes', () => {
    const currentDate = new Date().getTime();
    const pastDate = new Date(currentDate - 2 * 60 * 1000);
    const result = extractDateTime(pastDate);
    expect(result).toBe('2m ago');
  });

  test('should return error for future date', () => {
    const futureDate = new Date().getTime() + 2 * 60 * 60 * 1000;
    const result = extractDateTime(futureDate);
    expect(result).toBe(' Date Time can not exceed the Current Time ');
  });
});
