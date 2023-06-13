import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from './products';
import checkLoggedIn from '../../utils/authorise';
import { Provider } from 'react-redux';
import store from '../../redux/store/store';
import '@testing-library/jest-dom';

jest.mock('../../utils/authorise', () => jest.fn(() => true));

describe('Products component', () => {
  const data = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1', image: ['image1.jpg'] },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2', image: ['image2.jpg'] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with product data', () => {
    (checkLoggedIn as jest.Mock).mockReturnValue(true);
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Products data={data} />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('$20')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('Description 2')).toBeInTheDocument();
    expect(getByText('Explore Products')).toBeInTheDocument();
    expect(getByText('Sort')).toBeInTheDocument();
    expect(getByText('Filter')).toBeInTheDocument();
    expect(getByTestId('faFilter')).toBeInTheDocument();
    expect(getByTestId('faArrowsUpDown')).toBeInTheDocument();

  });
});
