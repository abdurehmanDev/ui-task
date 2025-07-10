import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import CountryDetails from './[countryName]';

// Mock next/image to render a regular img
jest.mock('next/image', () => {
  const React = require('react');
  return function Image(props: any) { return React.createElement('img', props); };
});

// Mock child components
jest.mock('../../components/Header', () => {
  const React = require('react');
  return function Header() { return React.createElement('div', { 'data-testid': 'header' }); };
});
jest.mock('../../components/LeftArrow', () => {
  const React = require('react');
  return function LeftArrow() { return React.createElement('span', { 'data-testid': 'left-arrow' }); };
});
jest.mock('next/link', () => {
  const React = require('react');
  return function Link({ children, href }: any) { return React.createElement('a', { href }, children); };
});

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({ query: { countryName: 'CountryA' } })
}));

// Mock fetch
const mockCountries = [
  {
    ccn3: '001',
    name: { common: 'CountryA', official: 'CountryA Official' },
    flags: { png: '/flagA.png' },
    population: 1000,
    region: 'RegionA',
    subregion: 'SubRegionA',
    capital: ['CapitalA'],
    timezones: ['UTC+1'],
    currencies: { USD: { name: 'US Dollar' } },
    languages: { en: 'English' },
    borders: ['CountryB', 'CountryC'],
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCountries),
  }) as any
) as jest.Mock;

describe('CountryDetails Page', () => {
  it('renders header and country flag', async () => {
    render(<CountryDetails />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByAltText('country-flag')).toBeInTheDocument();
    });
  });

  it('renders country name and details', async () => {
    render(<CountryDetails />);
    await waitFor(() => {
      expect(screen.getByText('CountryA')).toBeInTheDocument();
      expect(screen.getByText('CountryA Official')).toBeInTheDocument();
      expect(screen.getByText('RegionA')).toBeInTheDocument();
      expect(screen.getByText('SubRegionA')).toBeInTheDocument();
      expect(screen.getByText('CapitalA')).toBeInTheDocument();
      expect(screen.getByText('US Dollar')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
    });
  });
}); 