import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import TwoFactorAuth from '../components/TwoFactorAuth';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import URL from '../utils/api';
import store from '../redux/store/store';
import { BrowserRouter } from 'react-router-dom';

const mock = new MockAdapter(URL);

const TFAComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TwoFactorAuth />
      </BrowserRouter>
    </Provider>
  );
};
describe('Two Factor Authentication Functionality', () => {
  beforeEach(() => {
    render(<TFAComponent />);
  });
  it('should render TFA component', () => {
    const headerText = screen.getByText(/Send OTP/i);
    expect(headerText).toBeInTheDocument();
  });
  it('allows entering and submitting wrong OTP', async () => {
    mock.onPost('otp/verify').reply(401, { data: { message: 'not logged in' } });

    for (let index = 0; index < 6; index++) {
      const otpInput = screen.getByTestId(`input-element-${index}`);
      fireEvent.change(otpInput, { target: { value: index + 1 } });
    }
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    const toastMessage = await screen.findByText('Wrong Code');
    expect(toastMessage).toBeInTheDocument();
  });
  it('allows entering and submitting valid OTP', async () => {
    mock.onPost('otp/verify').reply(200, { message: 'OTP Verified' });

    for (let index = 0; index < 6; index++) {
      const otpInput = screen.getByTestId(`input-element-${index}`);
      fireEvent.change(otpInput, { target: { value: index + 1 } });
    }
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    const toastMessage = await screen.findByText('Send OTP');
    expect(toastMessage).toBeInTheDocument();
  });
  it('displays an error message when invalid OTP is entered', async () => {
  mock.onPost('otp/verify').reply(401, { data: { message: 'Invalid OTP' } });
  const invalidOTP = '123456';
  for (let index = 0; index < 6; index++) {
    const otpInput = screen.getByTestId(`input-element-${index}`);
    fireEvent.change(otpInput, { target: { value: invalidOTP[index] } });
  }
  const submitButton = screen.getByRole('button');
  fireEvent.click(submitButton);
  const errorMessage = await screen.findByText('Wrong Code');
  expect(errorMessage).toBeInTheDocument();
});
it('disables the submit button when the OTP is incomplete', () => {
  const incompleteOTP = '123';
  for (let index = 0; index < 3; index++) {
    const otpInput = screen.getByTestId(`input-element-${index}`);
    fireEvent.change(otpInput, { target: { value: incompleteOTP[index] } });
  }
  const submitButton = screen.getByRole('button');
  expect(submitButton).toBeDisabled();
});
it('displays the Resend verification code link', () => {
  const resendLink = screen.getByText('Resend verification code');
  expect(resendLink).toBeInTheDocument();
});
});
