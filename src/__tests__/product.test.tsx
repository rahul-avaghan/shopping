import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Products from '../components/ProductList';
import { store } from '../redux/store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { PRODUCTS_ENDPOINT } from '../redux/reducers/product';
import sampleData from '../test-utils/fixture/products.json';

const server = setupServer(
  rest.get(PRODUCTS_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(sampleData));
  })
);

const renderProductsPage = () =>
  render(
    <Provider store={store}>
      <Products />
    </Provider>
  );

describe('products', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should display all the products', async () => {
    renderProductsPage();

    await waitFor(() => screen.findByTestId(/product-container/));
    const products = screen.getAllByTestId(/product-item-/);

    expect(products.length).toEqual(1);
  });

  it('should display error message if server does not have data', async () => {
    server.use(
      rest.get(PRODUCTS_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderProductsPage();

    await waitFor(() => screen.findByText(/Alright Nothing much to shop today!/));

    expect(await screen.findByText(/Alright Nothing much to shop today!/)).toBeInTheDocument();
  });
});
