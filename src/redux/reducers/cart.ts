import { createSlice, Draft } from '@reduxjs/toolkit';
import { Cart, CartProductDetails } from '../model/Cart';
import { Product } from '../model/Product';
import { RootState } from '../store';

const initialState: Cart = {
  products: [] as CartProductDetails[],
  totalCredits: 0,
};

export const TOTAL_AVAILABLE_CREDITS = 10000;

const calculateLineCredits = (product: CartProductDetails, quanity: number) => quanity * getCredits(product);

const hasProduct = (cartProducts: CartProductDetails[], id: string) =>
  cartProducts.some((cartProduct) => cartProduct.product.id === id);

const isSameId = (cartProductDetails: CartProductDetails, payload: Product) =>
  cartProductDetails.product.id === payload.id;

const getCredits = (cartProductDetails: CartProductDetails) => {
  return cartProductDetails?.product?.metadata?.pricingStrategy?.credits || 0;
};

const getCreditsFromProduct = (product: Product) => product?.metadata?.pricingStrategy?.credits || 0;

const calculateTotalCredits = (products: CartProductDetails[]) =>
  products.map((product) => getCredits(product) * product.quantity).reduce((prev, curr) => prev + curr, 0) || 0;

const availableQuota = (state: Cart) => TOTAL_AVAILABLE_CREDITS - state.totalCredits;

const isWithinBudget = (state: Cart, payload: Product) => availableQuota(state) - getCreditsFromProduct(payload) > 0;

const getTotalProductsInCart = (state: Cart) =>
  (state.products.length && state.products.map(({ quantity }) => quantity).reduce((prev = 0, next) => prev + next)) ||
  0;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state: Draft<Cart>, action) => {
      if (!isWithinBudget(state, action.payload)) {
        return;
      }

      if (hasProduct(state.products, action.payload.id)) {
        state.products = state.products.map((cartProductDetails) => {
          const quantity = isSameId(cartProductDetails, action.payload)
            ? ++cartProductDetails.quantity
            : cartProductDetails.quantity;

          const lineCredits = calculateLineCredits(cartProductDetails, quantity);
          return {
            ...cartProductDetails,
            quantity: quantity,
            lineCredits,
          };
        });

        state.totalCredits = calculateTotalCredits(state.products);
        return;
      }

      state.totalCredits = state.totalCredits + getCreditsFromProduct(action.payload);
      state.products.push({
        product: action.payload,
        lineCredits: getCreditsFromProduct(action.payload),
        quantity: 1,
      });
    },
    removeProduct: (state: Draft<Cart>, action) => {
      state.products = state.products.filter((cartProductDetails) => !isSameId(cartProductDetails, action.payload));

      state.totalCredits = calculateTotalCredits(state.products);
    },
  },
});

const selectProductsInCart = (state: RootState) => state.cartInfo.products;
const selectTotalCredits = (state: RootState) => state.cartInfo.totalCredits;
const selectTotalQuota = (state: RootState) => availableQuota(state.cartInfo);
const selectTotalProducts = (state: RootState) => getTotalProductsInCart(state.cartInfo);

export const { addProduct, removeProduct } = cartSlice.actions;
export { selectProductsInCart, selectTotalCredits, selectTotalQuota, selectTotalProducts };
export default cartSlice;
