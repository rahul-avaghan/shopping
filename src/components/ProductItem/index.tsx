import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { Product } from '../../redux/model/Product';
import { CardActions, CardContent, CardMedia, Fab, Grid } from '@mui/material';
import { Body2, H5 } from '../common/typography';
import AddIcon from '@mui/icons-material/Add';
type ProductItemProps = {
  product: Product;
  addProduct(product: Product): void;
  removeProduct(product: Product): void;
};

const ProductItem = ({ product, addProduct }: ProductItemProps) => {
  const {
    id,
    metadata: { blockThumbnailUrl },
    name,
    displayName,
    description,
  } = product;

  return (
    <Card
      data-testid={`product-item-${id}`}
      className="card"
      key={product.id}
      sx={{ width: { xs: 300, sm: 250, lg: 250 } }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={blockThumbnailUrl} alt={name} />
        <CardContent>
          <H5 noWrap>{displayName}</H5>
          <Body2 noWrap>{description}</Body2>
        </CardContent>
        <CardActions>
          <Grid container direction="row-reverse">
            <Fab
              data-testid={`add-product-${product.id}`}
              size="small"
              onClick={() => addProduct(product)}
              color="primary"
              aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
