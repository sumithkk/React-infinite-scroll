import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('render header', () => {
  const { getByText } = render(<App />);
  const linkElement = getAllByPlaceholderText("search");
  expect(linkElement).toBeInTheDocument();
});
