// @vitest-environment happy-dom

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  const initialCount = 200
  render(<Counter initialCount={initialCount}/>);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent(String(initialCount));
});

test(
  'it should reset the count when the "Reset" button is pressed',
  async () => {
    const user = userEvent.setup();
    const initialCount = 200
    render(<Counter initialCount={initialCount}/>);
    const currentCount = screen.getByTestId('current-count');
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    expect(currentCount).toHaveTextContent(String(initialCount));

    await user.click(incrementButton)
    expect(currentCount).toHaveTextContent(String(initialCount + 1));

    await user.click(resetButton);

    expect(currentCount).toHaveTextContent("0");
  },
);
