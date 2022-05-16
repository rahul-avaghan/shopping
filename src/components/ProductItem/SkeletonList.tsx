import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { CardActions, CardContent } from '@mui/material';
import { Body2, H5 } from '../common/typography';

const SkeletonList = () => {
  const items = Array(15).fill(50);
  return (
    <Grid data-testid="product-loading" direction="row" container spacing={4}>
      {items.map((_, index) => (
        <Grid key={index} item columnSpacing={2} rowSpacing={3}>
          <Card key={index} className="card" sx={{ width: 250 }}>
            <CardActionArea>
              <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
              <CardContent>
                <H5>
                  <Skeleton />
                </H5>
                <Body2>
                  <Skeleton />
                </Body2>
              </CardContent>
              <CardActions>
                <Grid container direction="row-reverse">
                  <Skeleton width={60} height={35} animation="wave" variant="rectangular" />
                </Grid>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonList;
