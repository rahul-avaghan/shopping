import { Product } from '../../redux/model/Product';
import Card from '@mui/material/Card';
import { Box, CardContent, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Body2, H5, H6, SubTitle1 } from '../common/typography';

type CartItemProps = {
  product: Product;
  lineCredits: number;
  quantity: number;
  removeProduct(product: Product): void;
};

export const CartItem = ({ product, lineCredits, quantity, removeProduct }: CartItemProps) => {
  const {
    id,
    displayName,
    metadata: { blockThumbnailUrl },
  } = product;
  return (
    <Card key={id} raised={false} elevation={0} sx={{ display: 'flex', p: 2, height: { sm: 150 } }}>
      <CardMedia
        component="img"
        sx={{ width: { xs: 120, sm: 637, lg: 637 }, aspectRatio: '16/9' }}
        image={blockThumbnailUrl}
        alt={displayName}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <H6 sx={{ width: { xs: 118, sm: 140, lg: 200 } }}>{displayName}</H6>
          <SubTitle1>x {quantity}</SubTitle1>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 4 }}>
          <H5>{lineCredits}</H5> <Body2>{` cr`}</Body2>
        </Box>
        <Box>
          <IconButton onClick={() => removeProduct(product)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default CartItem;
