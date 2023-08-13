import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '../../src/components/search/SearchBar';
import * as useSearchRequest from '@/hooks/useSearchRequest';
import { MealProvider } from '@/context/MealsContext';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// Mock the useSearchRequest hook

const MockSearchBar = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MealProvider>
        <SearchBar />
      </MealProvider>
    </QueryClientProvider>
  );
};

jest.mock('@/components/portal/Portal', () => require('../../__mocks__/portalMock'));


describe('SearchBar Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders the search input correctly', () => {
    const { getByPlaceholderText } = render(<MockSearchBar />);
    const inputElement = getByPlaceholderText('Chocolate...');
    expect(inputElement).toBeInTheDocument();
  });

  test('triggers search request on input and submit', async () => {
    const startSearchRequestMock = jest.fn();

    jest.spyOn(useSearchRequest, 'useSearchRequest').mockReturnValue({
      response: null,
      status: 'success',
      startSearchRequest: startSearchRequestMock,
      error: undefined,
    });

    const { getByPlaceholderText } = render(<MockSearchBar />);
    const inputElement = getByPlaceholderText('Chocolate...');

    fireEvent.change(inputElement, { target: { value: 'Chocolate' } });
    fireEvent.submit(inputElement);

    await waitFor(() => {
      expect(startSearchRequestMock).toHaveBeenCalledWith('Chocolate');
    });
  });

  test('renders loading overlay when status is loading', () => {
    const startSearchRequestMock = jest.fn();

    jest.spyOn(useSearchRequest, 'useSearchRequest').mockReturnValue({
      response: null,
      status: 'loading',
      startSearchRequest: startSearchRequestMock,
      error: undefined,
    });

    const { getByTestId } = render(<MockSearchBar />);
    const loadingOverlay = getByTestId('loading-overlay'); 

    expect(loadingOverlay).toBeInTheDocument();
  });

});
