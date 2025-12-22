import { render as  _render, screen } from 'test/utilities';
import { PackingList } from '.';
import { Provider } from 'react-redux';
import { createStore } from '@/examples/packing-list-revisited/store';
import {PropsWithChildren, ReactElement} from 'react';

const render = (Component, options) => {
  const store = createStore();

  const Wrapper = ({children}: PropsWithChildren) => <Provider store={store}>{children}</Provider>

  return _render(Component, {...options, wrapper: Wrapper});
};

it('renders the Packing List application', () => {
  render(
    <Provider store={createStore()}>
      <PackingList />
    </Provider>,
  );
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByPlaceholderText(/new item/i);
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  screen.getByLabelText(/new item name/i);
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);

  const newItemInput = screen.getByPlaceholderText(/new item/i);
  const newItemButton = screen.getByRole('button', { name: 'Add New Item' });

  expect(newItemInput).toHaveValue('');
  expect(newItemButton).toBeDisabled();

  await user.type(newItemInput, 'MacBook Pro');

  expect(newItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);

  const newItemInput = screen.getByPlaceholderText(/new item/i);
  const newItemButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(newItemInput, 'MacBook Pro');

  await user.click(newItemButton);

  expect(screen.getByLabelText('MacBook Pro')).not.toBeChecked();
});

it('removes item when remove button is clicked', async () => {
  const { user } = render(<PackingList />);

  const newItemInput = screen.getByPlaceholderText(/new item/i);
  const newItemButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(newItemInput, 'MacBook Pro');
  await user.click(newItemButton);

  const removeItemButton = screen.getByLabelText(/remove/i);
  await user.click(removeItemButton);

  expect(screen.queryByLabelText('MacBook Pro')).not.toBeInTheDocument();
});

it('removes item when remove button is clickedo', async () => {
  const { user } = render(<PackingList />);

  const newItemInput = screen.getByPlaceholderText(/new item/i);
  const newItemButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(newItemInput, 'MacBook Pro');
  await user.click(newItemButton);

  const removeItemButton = screen.getByLabelText(/remove/i);
  await user.click(removeItemButton);

  expect(screen.queryByLabelText('MacBook Pro')).not.toBeInTheDocument();
});
