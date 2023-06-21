import { render, act } from '@testing-library/react';
import ProfileNav from './profileNav';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('ProfileNav component', () => {
  test('renders profile, purchases, wishlist, and chat links', async () => {
    const { getByText, getByTestId } = render(<ProfileNav />, { wrapper: MemoryRouter });
    await act(async () => {
      const profileLink = getByText('Profile');
      const purchasesLink = getByText('Purchases');
      const wishlistLink = getByText('Wishlist');
      const chatLink = getByText('Chat');

      expect(profileLink).toBeInTheDocument();
      expect(purchasesLink).toBeInTheDocument();
      expect(wishlistLink).toBeInTheDocument();
      expect(chatLink).toBeInTheDocument();

      const profileIcon = getByTestId('profile-icon');
      const purchasesIcon = getByTestId('purchases-icon');
      const wishlistIcon = getByTestId('wishlist-icon');
      const chatIcon = getByTestId('chat-icon');

      expect(profileIcon).toHaveClass('fa-circle-user');
      expect(purchasesIcon).toHaveClass('fa-bag-shopping');
      expect(wishlistIcon).toHaveClass('fa-heart');
      expect(chatIcon).toHaveClass('fa-message');
    });
  });
});
