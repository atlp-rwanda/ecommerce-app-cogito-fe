import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import '@testing-library/jest-dom';

describe('HomePage', () => {
  it('renders the title correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Shooping And Department Store/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the description correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const descriptionElement = screen.getByText(/Get whatever you need from the best sellers and the best price/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the button correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const buttonElement = screen.getByRole('button', { name: /Get Started/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
