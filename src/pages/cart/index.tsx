import { Box, Button } from '@mui/material';
import CartList from '../../components/CartList';
import EmptyCart from '../../components/placeholders/EmptyCart';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CartProductDetails } from '../../redux/model/Cart';
import ErrorContainer from '../../components/common/ErrorContainer';
import { H5 } from '../../components/common/typography';

const Cart = () => {
  const products = useSelector<RootState>((state) => state.cartInfo.products) as CartProductDetails[];

  if (!products.length) {
    return (
      <ErrorContainer>
        <H5>Oops!.. Cart is empty!.</H5>Ï
        <EmptyCart />
        <Button href="/" sx={{ m: 2 }} variant="contained" color="success">
          Continue Shopping
        </Button>
      </ErrorContainer>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <H5 alignContent="center" paddingTop={2} paddingBottom={2}>
        Order Summary
      </H5>
      <CartList />
    </Box>
  );
};

export default Cart;
