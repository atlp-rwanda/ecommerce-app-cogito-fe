import checkLoggedIn from '../utils/authorise';
import * as tokenUtils from '../utils/token';

// Mock the DecodeToken function to return a valid token
jest.mock('../utils/token', () => {
    return {
      __esModule: true,
      default: jest.fn(), // Mock the default export
    };
  });

describe('checkLoggedIn', () => {
  it('should return false if there is no token in localStorage', () => {
    // Arrange
    localStorage.removeItem('token');

    // Act
    const result = checkLoggedIn();

    // Assert
    expect(result).toBe(false);
  });

  it('should return false if DecodeToken returns falsy value', () => {
    // Arrange
    localStorage.setItem('token', 'sampleToken');
    (tokenUtils.default as jest.Mock).mockReturnValue(null); // Mock DecodeToken to return null

    // Act
    const result = checkLoggedIn();

    // Assert
    expect(result).toBe(false);
  });

  it('should return false if the token has expired', () => {
    // Arrange
    localStorage.setItem('token', 'sampleToken');
    (tokenUtils.default as jest.Mock).mockReturnValue({
      exp: Math.floor(Date.now() / 1000) - 3600, // Token expired 1 hour ago
    });

    // Act
    const result = checkLoggedIn();

    // Assert
    expect(result).toBe(false);
  });

  it('should return true if the token is valid and not expired', () => {
    // Arrange
    localStorage.setItem('token', 'sampleToken');
    (tokenUtils.default as jest.Mock).mockReturnValue({
      exp: Math.floor(Date.now() / 1000) + 3600, // Token expiration in 1 hour
    });

    // Act
    const result = checkLoggedIn();

    // Assert
    expect(result).toBe(true);
  });
});
