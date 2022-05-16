import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type NavigationState = {
  isSideBarOpen: boolean;
  drawerWidth: number;
};

const drawerWidth = 240;
const initialState = {
  isSideBarOpen: true,
  drawerWidth,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
      state.drawerWidth = state.isSideBarOpen ? drawerWidth : 0;
    },
  },
});

export const { toggle } = navigationSlice.actions;
export const selectNavigation = (state: RootState) => state.navigation;
export default navigationSlice;
