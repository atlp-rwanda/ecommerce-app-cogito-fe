import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Wishlist from './wishlist';
import { Provider } from 'react-redux';
import store from '../../redux/store/store';
import '@testing-library/jest-dom';

describe('Wishlist component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with product data', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Wishlist />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('My Wishlist')).toBeInTheDocument();
    expect(getByText('Empty Wishlist')).toBeInTheDocument();
    expect(getByText('Add to cart')).toBeInTheDocument();
  });
});
