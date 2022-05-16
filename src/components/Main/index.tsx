import { Box } from '@mui/material';
import React from 'react';
import SideMenu from '../SideMenu';
import Navigation from '../Navigation';
import { Route, Routes } from 'react-router';
import Product from '../../pages/product';
import Cart from '../../pages/cart';
import { useAppSelector } from '../../redux/store';
import { selectNavigation } from '../../redux/reducers/navigation';

const Main = () => {
  const { drawerWidth } = useAppSelector(selectNavigation);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { lg: `calc(100% - ${drawerWidth}px)` },
          }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="products" element={<Product />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </Box>
        <SideMenu />
      </Box>
    </>
  );
};

export default Main;
