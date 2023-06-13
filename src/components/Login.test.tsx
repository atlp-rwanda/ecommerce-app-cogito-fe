import { act, render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from './Login';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import store from '../redux/store/store';
import dotenv from 'dotenv';

dotenv.config();
describe('Login Page', () => {
  beforeEach(async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>,
      ),
    );
  });
  it('Should initially set the state to the initial state', () => {
    const state = store.getState().login;
    expect(state.state).toEqual('INITIAL');
    expect(state.data).toEqual(null);
    expect(state.status).toEqual(null);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(false);
  });
  test('should render the login form with some element on the form', async () => {
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.getByText('Please enter your login details to login')).toBeInTheDocument();
    expect(screen.getByText('Keep me logged in')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Signup' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Forgot Password?' })).toBeInTheDocument();
  });
  test('should display error messages for empty fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please Fill In All Fields')).toBeInTheDocument();
  });
  test('should display error messages when email address is missing', async () => {
    const passwordInput = screen.getByPlaceholderText('Enter Your Password') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'password123' } }) as unknown as string;
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please Enter Your Email Address')).toBeInTheDocument();
  });
});
