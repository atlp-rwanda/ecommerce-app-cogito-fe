import { act, render, screen } from '@testing-library/react';
import NotificationPane from '../Notifications/notification';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { handleNotifications } from '../../redux/action/notificationAction';
import { fireEvent } from '@testing-library/react';
const mockStore = configureStore([thunk]);
describe('Notification Pane Test', () => {
  beforeEach(async () => {
    const notifications = [
      {
        id: 1,
        subject: 'Test Subject',
        message: 'Test Message ',
        type: 'newProduct',
        isRead: false,
        userId: 2,
        createdAt: '2023-07-10T14:30:17.020Z',
        updatedAt: '2023-07-12T08:00:32.990Z',
      },
      {
        id: 6,
        subject: 'New Product added',
        message: 'Hello John Doe your product Avocado was added successfully! ',
        type: 'newProduct',
        isRead: false,
        userId: 2,
        createdAt: '2023-07-10T14:30:17.020Z',
        updatedAt: '2023-07-12T08:00:32.990Z',
      },
      {
        id: 2,
        subject: 'New Product added',
        message: 'Hello John Doe your product Avocado was added successfully! ',
        type: 'newProduct',
        isRead: true,
        userId: 2,
        createdAt: '2023-07-09T14:30:17.020Z',
        updatedAt: '2023-07-12T08:00:32.990Z',
      },
      {
        id: 8,
        subject: 'New Product added',
        message: 'Hello John Doe your product Dress was added successfully! \nHello John Doe your product Dress was added successfully! ',
        type: 'newProduct',
        isRead: true,
        userId: 2,
        createdAt: '2019-07-07T09:25:18.318Z',
        updatedAt: '2023-07-12T08:00:32.990Z',
      },
      {
        id: 7,
        subject: 'New Product added',
        message: 'Hello John Doe your product Avocado was added successfully! ',
        type: 'newProduct',
        isRead: true,
        userId: 2,
        createdAt: '2023-07-09T14:30:17.020Z',
        updatedAt: '2023-07-12T08:00:32.990Z',
      },
    ];
    const initialState = {
      notification: {
        data: notifications,
        status: 200,
        message: 'Notification were retrieved successfully',
        loading: false,
        error: false,
        markAllAsReadMessage: '',
      },
    };
    const store = mockStore(initialState);
    const userDetails = {
      id: 2,
    };
    store.dispatch<any>(handleNotifications({ id: userDetails.id }));
    await act(async () =>
      render(
        <Provider store={store}>
          <NotificationPane />
        </Provider>,
      ),
    );
  });
  it('Should render Notification Pane once the faBell icon is clicked', () => {
    fireEvent.click(screen.getByTestId('faBell'));
    expect(screen.getByText('Your Notification')).toBeInTheDocument();
    expect(screen.queryByTestId('faCheckDouble')).toBeInTheDocument();
    expect(screen.queryByTestId('faGear')).toBeInTheDocument();
    expect(screen.queryByTestId('faMultiply')).toBeInTheDocument();
  });
  it('Should display all available notifications', () => {
    fireEvent.click(screen.getByTestId('faBell'));
    expect(screen.getByText('Your Notification')).toBeInTheDocument();
    expect(screen.queryByTestId('faCheckDouble')).toBeInTheDocument();
    expect(screen.queryByTestId('faGear')).toBeInTheDocument();
    expect(screen.queryByTestId('faMultiply')).toBeInTheDocument();
    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(5);
    expect(tableRows[0]).toHaveTextContent('Test Subject: Test Message');
    expect(tableRows[1]).toHaveTextContent('Hello John Doe your product Avocado was added successfully! ');
    expect(tableRows[2]).toHaveTextContent('Hello John Doe your product Avocado was added successfully! ');
    expect(tableRows[3]).toHaveTextContent('Hello John Doe your product Dress was added successfully! Hello John Doe your product Dress was added successfully!');
    expect(tableRows[4]).toHaveTextContent('Hello John Doe your product Avocado was added successfully! ');
  });
});
