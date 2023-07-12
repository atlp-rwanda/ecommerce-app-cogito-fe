import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
// import URL from '../utils/api';
import store from '../redux/store/store';
import { BrowserRouter } from 'react-router-dom';
import Users from '../pages/Admin/Users';
// const mock = new MockAdapter(URL);

const ManageUsersComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    </Provider>
  );
};
describe('Manage users component', () => {
  beforeEach(() => {
    render(<ManageUsersComponent />);
  });
  it('should render Users component', () => {
    const headerText = screen.getByText(/Manage users/i);
    expect(headerText).toBeInTheDocument();
  });
  //   it('allows entering and submitting wrong OTP', async () => {
  //     mock.onPost('otp/verify').reply(401, { data: { message: 'not logged in' } });

  //     for (let index = 0; index < 6; index++) {
  //       const otpInput = screen.getByTestId(`input-element-${index}`);
  //       fireEvent.change(otpInput, { target: { value: index + 1 } });
  //     }
  //     const submitButton = screen.getByRole('button');
  //     fireEvent.click(submitButton);

  //     const toastMessage = await screen.findByText('Wrong Code');
  //     expect(toastMessage).toBeInTheDocument();
  //   });
  //   it('allows entering and submitting valid OTP', async () => {
  //     mock.onPost('otp/verify').reply(200, { message: 'OTP Verified' });

  //     for (let index = 0; index < 6; index++) {
  //       const otpInput = screen.getByTestId(`input-element-${index}`);
  //       fireEvent.change(otpInput, { target: { value: index + 1 } });
  //     }
  //     const submitButton = screen.getByRole('button');
  //     fireEvent.click(submitButton);

  //     const toastMessage = await screen.findByText('Send OTP');
  //     expect(toastMessage).toBeInTheDocument();
  //   });
});
