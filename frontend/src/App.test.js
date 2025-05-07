import { render, screen } from '@testing-library/react';
import App from './App';

test('renders campaign manager heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/campaign manager/i);
  expect(headingElement).toBeInTheDocument();
});
