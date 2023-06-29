import { act, render, screen } from '@testing-library/react';
import { UpdatePasswordPage } from '../components/UpdatePassword';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import store from '../redux/store/store';
import dotenv from 'dotenv';

dotenv.config();
describe('Update Password Page', () => {
  beforeEach(async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <UpdatePasswordPage />
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
  test('should render the update password form with some element on the form', async () => {
    expect(screen.getByText('Update Password Page')).toBeInTheDocument();
    expect(screen.getByText('Please enter credential details to update your password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Old Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your New Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Your New Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update Password' })).toBeInTheDocument();
  });
});
