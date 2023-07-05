import { render, screen } from '@testing-library/react';
import ProfileCard from './profileCard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('ProfileCard', () => {
  const title = 'Profile Card Title';
  const properties = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '********',
    billing_address: ['123 Main St', 'City', 'Country'],
  };

  beforeEach(() => {
    render(<ProfileCard title={title} properties={properties} />, { wrapper: MemoryRouter });
  });

  test('renders the title', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('renders properties', () => {
    expect(screen.getByText('name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('email:')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  test('renders password property with change password button', () => {
    expect(screen.getByText('password:')).toBeInTheDocument();
    expect(screen.getByText('Change your password')).toBeInTheDocument();
  });

  test('renders billing_address property as comma-separated values', () => {
    expect(screen.getByText('billing address:')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, City, Country')).toBeInTheDocument();
  });
});
