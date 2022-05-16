import { useEffect } from 'react';
import { fetchProducts, ProductState, selectProducts } from '../../redux/reducers/product';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addProduct, removeProduct } from '../../redux/reducers/cart';
import ProductItem from '../ProductItem';
import { Grid } from '@mui/material';
import SkeletonList from '../ProductItem/SkeletonList';
import NoData from '../placeholders/NoData';
import ErrorContainer from '../common/ErrorContainer';
import { SubTitle1 } from '../common/typography';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(selectProducts) as ProductState;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) {
    return <SkeletonList></SkeletonList>;
  }

  if (!products || !products.length) {
    return (
      <ErrorContainer>
        <SubTitle1>Alright Nothing much to shop today!.</SubTitle1>
        <NoData />
      </ErrorContainer>
    );
  }

  return (
    <Grid
      data-testid="product-container"
      sx={{ overflow: 'auto', height: '90vh' }}
      direction="row"
      container
      spacing={4}>
      {products?.map((product) => (
        <Grid key={product.id} item columnSpacing={2} rowSpacing={3}>
          <ProductItem
            product={product}
            addProduct={(product) => dispatch(addProduct(product))}
            removeProduct={(product) => dispatch(removeProduct(product))}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
