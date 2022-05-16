import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import { fireEvent, render } from '@testing-library/react/pure';
import App from '../App';
import { rest } from 'msw';
import { PRODUCTS_ENDPOINT } from '../redux/reducers/product';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { setupServer } from 'msw/node';
import sampleData from '../test-utils/fixture/products.json';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../redux/model/Product';

const server = setupServer(
  rest.get(PRODUCTS_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(sampleData));
  })
);

const renderApp = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

describe('app', () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => server.close());

  it('product price should be calculated', async () => {
    // arrange
    renderApp();
    const [firstProduct] = sampleData.data as unknown as Product[];
    const credits = firstProduct.metadata.blockPricingStrategy.credits;

    // act
    await waitFor(() => screen.findByTestId(/product-container/));

    // add a product
    const [product] = screen.getAllByTestId(/add-product-/);
    fireEvent.click(product);

    // go to cart
    const [cartLink] = await screen.findAllByTestId(/go-to-cart/i);
    fireEvent.click(cartLink);

    // assert
    expect(screen.getByTestId(/total-price/)).toHaveTextContent(`${credits} Cr`);
  });
});
