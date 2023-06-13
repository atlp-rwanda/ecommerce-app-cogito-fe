import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './navBar';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../utils/token', () => ({
  __esModule: true,
  default: jest.fn(() => ({ name: 'John Doe' })),
}));

describe('NavBar', () => {
  test('renders the phone number', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    const phoneNumberElement = screen.getByText('+250 781 234 8928');

    expect(phoneNumberElement).toBeInTheDocument();
  });

  test('renders the logo', () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    const logoElement = screen.getByAltText('logo');

    expect(logoElement).toBeInTheDocument();
  });

  test('renders the login button when not logged in', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);

    render(<NavBar />, { wrapper: MemoryRouter });

    const loginButtonElement = screen.getByRole('button', { name: 'Login' });

    expect(loginButtonElement).toBeInTheDocument();
  });

  test('renders the user name when logged in', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('mockToken');
    jest.spyOn(console, 'log').mockImplementation();

    jest.mock('../../utils/token', () => {
      return jest.fn(() => ({ name: 'John Doe' }));
    });

    render(<NavBar />, { wrapper: MemoryRouter });

    const userNameElement = screen.getByText('John');

    expect(userNameElement).toBeInTheDocument();
  });
  test('handles search input and click', () => {
    const { getByPlaceholderText, getByTestId } = render(<NavBar />, { wrapper: MemoryRouter });
    const searchInput = getByPlaceholderText('Search product') as HTMLInputElement;
    const searchButton = getByTestId('search-button');
    const consoleLogSpy = jest.spyOn(console, 'log');

    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(searchInput.value).toBe('test search');

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    expect(consoleLogSpy).toHaveBeenCalledWith('Search Term:', 'test search');

    fireEvent.click(searchButton);

    expect(consoleLogSpy).toHaveBeenCalledWith('Search Term:', 'test search');
  });
  test('handles language change', () => {
    const { getByText, getByTestId } = render(<NavBar />, { wrapper: MemoryRouter });
  
    const languageDropdownButton = getByTestId('language-dropdown-button');
    fireEvent.click(languageDropdownButton);
  
    const frenchOption = getByText('French');
    fireEvent.click(frenchOption);
  
    const languageText = getByText('Fr');
    expect(languageText).toBeInTheDocument();
  });
  
  test('handles category change', () => {
    const { getByText, getByTestId } = render(<NavBar />, { wrapper: MemoryRouter });
  
    const categoryDropdownButton = getByTestId('category-dropdown-button');
    fireEvent.click(categoryDropdownButton);
  
    const selectedCategory = 'Fashion';
    const categoryOption = getByText(selectedCategory);
    fireEvent.click(categoryOption);
  
    const selectedCategoryText = getByText(selectedCategory);
    expect(selectedCategoryText).toBeInTheDocument();
  });
});
