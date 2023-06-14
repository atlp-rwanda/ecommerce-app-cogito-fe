import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import ResetPasswordPage from './resetPassword';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('ResetPasswordPage', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({}); // Provide an initial state if needed

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ResetPasswordPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  test('renders Reset Password page', () => {
    const pageTitle = screen.getByText('Forgot Password?');
    expect(pageTitle).toBeInTheDocument();
  });

  test('updates email input value', () => {
    const emailInput = screen.getByPlaceholderText('Enter Your Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'kundaaggy@gmail.com' } });
    expect(emailInput.value).toBe('kundaaggy@gmail.com');
  });

  test('submits form with valid email', () => {
    const emailInput = screen.getByPlaceholderText('Enter Your Email') as HTMLInputElement;
    const submitButton = screen.getByText('Submit');
    fireEvent.change(emailInput, { target: { value: 'kundaaggy@gmail.com' } });
    fireEvent.click(submitButton);
    // Add assertions for form submission
  });

  test('cancels form submission', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    // Add assertions for cancel button functionality
  });
});
