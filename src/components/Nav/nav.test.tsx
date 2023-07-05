import { fireEvent, render } from '@testing-library/react';
import NavBar from './navBar';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store/store';

describe('NavBar', () => {
  test('renders the phone number', () => {
    const {getByText}= render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>,
    );

    const phoneNumberElement = getByText('+250 781 234 8928');

    expect(phoneNumberElement).toBeInTheDocument();
  });

  test('renders the logo', () => {
    const{getByAltText}=render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>,
    );
    const logoElement = getByAltText('logo');

    expect(logoElement).toBeInTheDocument();
  });

  test('renders the login button when not logged in', () => {
    localStorage.removeItem('token');
    const {getByRole} = render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>,
    );
    const loginButtonElement = getByRole('button', { name: 'Login' });

    expect(loginButtonElement).toBeInTheDocument();
  });

  test('handles language change', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>,
    );

    const languageDropdownButton = getByTestId('language-dropdown-button');
    fireEvent.click(languageDropdownButton);

    const frenchOption = getByText('French');
    fireEvent.click(frenchOption);

    const languageText = getByText('Fr');
    expect(languageText).toBeInTheDocument();
  });
});
