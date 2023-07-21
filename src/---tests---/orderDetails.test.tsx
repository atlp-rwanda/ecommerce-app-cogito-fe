
import { render, screen, waitFor } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux'; // If your component relies on a Redux store
import { BrowserRouter as Router } from 'react-router-dom'; // If your component uses react-router-dom
import OrderDetails from '../pages/checkout/orderDetails';
import store from '../redux/store/store'; // Make sure to import the RootState and provide it to the Redux Provider
import '@testing-library/jest-dom/extend-expect';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

// Mock the useDispatch hook (if you use it) to return a mock function
jest.mock('../redux/hooks/hooks.tsx', () => ({
  useAppDispatch: () => jest.fn(),
}));

// Mock the DecodeToken function
jest.mock('../utils/token.tsx', () => {
  return () => {
    return {
      name: 'John Doe', // Mocked 'name'
    };
  };
});

describe('OrderDetails component', () => {
  it('renders without errors', async () => {
    // Mock the orderStatus state with the data you want to test
    const mockOrderStatusData = {
      state: {
        data: {
          order_id: 'ABC123',
          createdAt: '2023-07-26T12:34:56Z',
          paymentStatus: 'paid',
          shippingStatus: 'shipped',
          Tracking: '123456789',
          shippingAddress: ['123 Main St', 'City', 'Country'],
          totalCost: 100.0,
        },
      },
    };
    (useSelector as jest.Mock).mockReturnValue(mockOrderStatusData);

    // Render the component with the required providers (Redux, Router)
    render(
      <Provider store={store}>
        <Router>
          <OrderDetails />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      const orderNumberElement = screen.getByText(/#ABC123/i);
      const userNameElement = screen.getByText(/Hi! John Doe/i);
      expect(orderNumberElement).toBeInTheDocument();
      expect(userNameElement).toBeInTheDocument();
    });
  });
});
