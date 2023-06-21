import { render, screen, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';
import assert from 'assert';
import { Provider } from 'react-redux';
import store from '../../redux/store/store';

const findByTextCaseInsensitive = (container: HTMLElement, text: string): HTMLElement | null => {
  const elements = Array.from(container.querySelectorAll('*'));

  return elements.find((element) => {
    const elementText = element.textContent || '';
    const regex = new RegExp(text, 'i');

    return regex.test(elementText);
  }) as HTMLElement | null;
};

describe('Footer', () => {
  test('renders the logo', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </Provider>,
    );
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders the categories', () => {
    const renderComponent = (): RenderResult => {
      return render(
        <Provider store={store}>
          <MemoryRouter>
            <Footer />
          </MemoryRouter>
        </Provider>,
      );
    };
    const { container } = renderComponent();
    const element = findByTextCaseInsensitive(container, '/category link/i');
    assert(element !== null, 'Element not found');
  });

  test('renders the payment methods', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </Provider>,
    );
    const paymentMethodElements = screen.getAllByAltText('Payment method');
    expect(paymentMethodElements.length).toBeGreaterThan(0);
  });

  test('renders the quick links', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </Provider>,
    );
    const quickLinkElements = screen.getAllByRole('link', { name: /^[a-zA-Z\s]+$/ });
    const filteredQuickLinkElements = quickLinkElements.filter((element) => element.classList.contains('quick_link'));
    expect(filteredQuickLinkElements.length).toBeGreaterThan(0);
  });

  test('renders the copyright text', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </Provider>,
    );
    const copyrightElement = screen.getByText('All Rights Reserved By Cogito | 2023');
    expect(copyrightElement).toBeInTheDocument();
  });
});
