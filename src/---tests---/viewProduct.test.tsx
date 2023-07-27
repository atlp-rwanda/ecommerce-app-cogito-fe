import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import ProductView from '../pages/viewProduct';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Define a mock product data for testing
const mockProductData = {
  id: 1,
  name: 'Mock Product',
  price: 29.99,
  quantity: 10,
  description: 'This is a mock product for testing purposes.',
  image: [
    'https://example.com/product/image1.jpg',
    'https://example.com/product/image2.jpg',
    'https://example.com/product/image3.jpg',
  ],
};

// Mock react-redux useSelector and useDispatch hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock react-router-dom useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: mockProductData.id })),
}));

describe('ProductView component', () => {
  // Define a mock implementation for the useDispatch hook
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Reset the mock functions before each test
    jest.clearAllMocks();

    // Set up the useSelector mock to return your mock product data
    (useSelector as jest.Mock).mockReturnValue({ state: { data: mockProductData } });

    // Set up the useDispatch mock to return the mockDispatch function
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  test('renders the component without errors', () => {
    // Render the component with MemoryRouter to provide route props
    render(
      <MemoryRouter initialEntries={[`/product/${mockProductData.id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Product Details')).toBeInTheDocument();
    expect(screen.getByText(mockProductData.name)).toBeInTheDocument();

  });

  test('dispatches ViewProduct action on mount', () => {
    // Render the component with MemoryRouter to provide route props
    render(
      <MemoryRouter initialEntries={[`/product/${mockProductData.id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductView />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the ViewProduct action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

});
