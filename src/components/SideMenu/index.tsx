import Toolbar from '@mui/material/Toolbar';
import { ListAltSharp, ShoppingBag } from '@mui/icons-material';
import { Badge, Box, Drawer, List } from '@mui/material';
import ListItemLink from '../common/ListItemLink';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectTotalProducts } from '../../redux/reducers/cart';
import { H5 } from '../common/typography';
import { selectNavigation, toggle } from '../../redux/reducers/navigation';

const SideMenu = () => {
  const totalItems = useAppSelector(selectTotalProducts);

  const dispatch = useAppDispatch();
  const { drawerWidth, isSideBarOpen } = useAppSelector(selectNavigation);

  const AppName = memo(function appName() {
    return (
      <>
        <ShoppingBag />
        <H5 sx={{ flexGrow: 1 }}>Shopping App</H5>
      </>
    );
  });

  const MenuItems = memo(function MenuItems() {
    return (
      <Box sx={{ width: '100%', maxWidth: drawerWidth, bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="products cart">
          <ListItemLink testId="go-to-products" to="/" primary="Products" icon={<ListAltSharp />} />
          <ListItemLink
            testId="go-to-cart"
            to="/cart"
            primary="Cart"
            icon={
              <Badge badgeContent={totalItems} color="error">
                <ShoppingBag />
              </Badge>
            }
          />
        </List>
      </Box>
    );
  });

  const DrawerContent = () => (
    <>
      <Toolbar>
        <AppName />
      </Toolbar>
      <MenuItems />
    </>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="side-menu-options">
      <Drawer
        variant="temporary"
        open={isSideBarOpen}
        onClose={() => dispatch(toggle())}
        anchor="right"
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}>
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="persistent"
        open={isSideBarOpen}
        anchor="right"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}>
        <DrawerContent />
      </Drawer>
    </Box>
  );
};

export default SideMenu;
