// @vitest-environment jsdom

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';


test('it should render the component', () => {
    render(<Counter />);
});

test(
  'it should increment when the "Increment" button is pressed',
  async () => {
      const user = userEvent.setup()
      render(<Counter />);
      const count = screen.getByTestId("current-count")
      expect(count).toHaveTextContent("0")
      const incrementButton = screen.getByRole('button', { name: 'Increment' })

      await user.click(incrementButton)

      expect(count).toHaveTextContent("1")
  },
);
