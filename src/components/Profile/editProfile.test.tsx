import { render, act } from '@testing-library/react';
import EditProfile from './editProfile';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store/store';
import '@testing-library/jest-dom';
import checkLoggedIn from '../../utils/authorise';

jest.mock('../../utils/authorise');

describe('editProfile', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('should be able to display page title and form fields', async () => {
    (checkLoggedIn as jest.Mock).mockReturnValue(true);
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <EditProfile />
        </MemoryRouter>
      </Provider>,
    );
    await act(async () => {
      expect(getByText('Edit Your Profile')).toBeInTheDocument();
      expect(getByText('Full Name')).toBeInTheDocument();
      expect(getByText('Email')).toBeInTheDocument();
      expect(getByText('Gender')).toBeInTheDocument();
      expect(getByText('Phone Number')).toBeInTheDocument();
      expect(getByText('Birth Date')).toBeInTheDocument();
      expect(getByText('Preferred Language')).toBeInTheDocument();
      expect(getByText('Preferred Currency')).toBeInTheDocument();
      expect(getByText('Address')).toBeInTheDocument();
    });
  });
});
