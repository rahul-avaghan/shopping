import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggle } from '../../redux/reducers/navigation';
import { Money, ShoppingBag } from '@mui/icons-material';
import { Badge, Chip } from '@mui/material';
import { selectTotalCredits, selectTotalQuota } from '../../redux/reducers/cart';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const quota = useAppSelector(selectTotalQuota);
  const credits = useAppSelector(selectTotalCredits);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton sx={{ display: { xs: 'block', sm: 'none', lg: 'none' } }}>
          <Badge badgeContent={credits} color="error">
            <ShoppingBag />
          </Badge>
        </IconButton>
        <Chip data-testid="quota" color="primary" icon={<Money />} label={quota} />
        <IconButton color="secondary" aria-label="open drawer" onClick={() => dispatch(toggle())} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
