import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BeerList from './index';

describe('BeerList component', () => {
  const mockBeerList = [
    { id: '1', name: 'Beer 1', brewery_type: 'Type 1' },
    { id: '2', name: 'Beer 2', brewery_type: 'Type 2' },
  ];

  const fetchDataMock = jest.fn();

  beforeEach(() => {
    jest.mock('./utils', () => ({
      fetchData: fetchDataMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the BeerList component', () => {
    fetchDataMock.mockReturnValueOnce({ setData: jest.fn(), sort: null });

    render(<BeerList />);

    // Check if the component renders successfully
    expect(screen.getByText('BeerList page')).toBeInTheDocument();
  });

  it('fetches data on component mount', () => {
    fetchDataMock.mockReturnValueOnce({ setData: jest.fn(), sort: null });

    render(<BeerList />);

    // Check if fetchData is called on component mount
    expect(fetchDataMock).toHaveBeenCalledWith({ setData: expect.any(Function), sort: null });
  });

  it('handles sorting by name', () => {
    fetchDataMock.mockReturnValueOnce({ setData: jest.fn(), sort: 'name' });

    render(<BeerList />);

    fireEvent.click(screen.getByText('Sort by Name'));

    // Check if fetchData is called with the correct sort criteria
    expect(fetchDataMock).toHaveBeenCalledWith({ setData: expect.any(Function), sort: 'name' });
  });

  // Add more test cases as needed for different functionalities
});
