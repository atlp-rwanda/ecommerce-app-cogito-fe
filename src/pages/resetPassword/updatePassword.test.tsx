import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter, useParams } from 'react-router-dom';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import UpdatePasswordPage from './updatePassword';
import { updatePassword } from '../../redux/action/resetPasswordAction';

jest.mock('../../redux/action/resetPasswordAction', () => ({
  updatePassword: jest.fn().mockReturnValue(() => Promise.resolve()),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('UpdatePasswordPage', () => {
  const mockStore = configureStore([thunk]);
  let store;

  beforeEach(() => {
    store = mockStore({});
    // Mock the token value from useParams
    (useParams as jest.Mock).mockReturnValue({ token: 'valid-token' });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdatePasswordPage />
        </BrowserRouter>
      </Provider>,
    );
  });
  test('renders Reset Password page', () => {
    const pageTitle = screen.getByText('Reset Password');
    expect(pageTitle).toBeInTheDocument();
  });

  test('updates password input value', () => {
    const passwordInput = screen.getByPlaceholderText('Enter New Password') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });
    expect(passwordInput.value).toBe('newPassword123');
  });

  test('toggles password visibility', () => {
    const toggleButton = screen.getByTestId('toggle-password-visibility');
    const passwordInput = screen.getByPlaceholderText('Enter New Password') as HTMLInputElement;

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  test('submits form with valid password', async () => {
    const passwordInput = screen.getByPlaceholderText('Enter New Password') as HTMLInputElement;
    const submitButton = screen.getByText('Submit');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });
      fireEvent.click(submitButton);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Allow component to update asynchronously
    });

    expect(updatePassword).toHaveBeenCalledWith({ token: 'valid-token', newPassword: 'newPassword123' });
  });

  test('cancels form submission', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    // Add assertions for cancel button functionality (e.g., navigate to the login page)
  });
});
