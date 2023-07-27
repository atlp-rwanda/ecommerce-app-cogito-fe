import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux'; // Import the Provider component
import configureStore from 'redux-mock-store'; // Import the configureStore function
import { AddProductForm } from '../components/productForm/productForm';

describe('AddProductForm', () => {
  const onClose = jest.fn();
  const mockStore = configureStore(); // Create a mock store
  const store = mockStore({}); // Initialize the store with an empty initial state

  test('renders AddProductForm component', () => {
    render(
      <Provider store={store}>
        {' '}
        {/* Wrap the component with the Provider and provide the store */}
        <AddProductForm visible={true} onClose={onClose} />
      </Provider>,
    );

    // Assert that the form elements are rendered
    expect(screen.getByPlaceholderText('Product Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Product Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Product Image')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Product Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('In stock')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Category_id')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Quantity')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ExpiredAt')).toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', () => {
    render(
      <Provider store={store}>
        {' '}
        {/* Wrap the component with the Provider and provide the store */}
        <AddProductForm visible={true} onClose={onClose} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('X'));

    expect(onClose).toHaveBeenCalled();
  });

  // Add more tests for form input validation and submit button click
});
