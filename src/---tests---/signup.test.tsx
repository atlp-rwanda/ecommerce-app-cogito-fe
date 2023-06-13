import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

import SignupForm from '../pages/register';

describe('SignupForm', () => {
  const mockStore = configureStore([]);
  const store = mockStore({}); // Pass any initial state if required

  it('should render SignupForm correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    // Perform assertions on form elements, labels, buttons, etc.
    const nameInput = getByPlaceholderText('Enter your name');
    expect(nameInput).toBeInTheDocument();

    const emailInput = getByPlaceholderText('Enter your email');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = getByPlaceholderText('Enter your password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('should submit the form when all fields are filled correctly', async () => {
    const { getByPlaceholderText, getByText, getByTestId} = render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByPlaceholderText('Enter your email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(getByPlaceholderText('Confirm your password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(getByTestId('terms-checkbox'));

    fireEvent.click(getByText('Create an account'));
  });
});
