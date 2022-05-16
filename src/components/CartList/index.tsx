import { Box, Button, Divider } from '@mui/material';
import { removeProduct, selectProductsInCart, selectTotalCredits } from '../../redux/reducers/cart';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { H5 } from '../common/typography';
import CartItem from '../CartItem';

const CartList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsInCart);
  const totalCredits = useAppSelector(selectTotalCredits);

  return (
    <>
      <Box data-testid="cart-container" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map(({ quantity, lineCredits, product }) => (
          <CartItem
            data-testid={`cart-item-${product.id}`}
            key={product.id}
            product={product}
            lineCredits={lineCredits}
            quantity={quantity}
            removeProduct={(product) => dispatch(removeProduct(product))}
          />
        ))}
        )
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pl: 1,
            pr: 2,
          }}>
          <H5>Total Credits</H5>
          <H5 data-testid="total-price">{`${totalCredits} Cr`}</H5>
        </Box>
        <Button variant="contained">Complete Shopping</Button>
      </Box>
    </>
  );
};

export default CartList;
