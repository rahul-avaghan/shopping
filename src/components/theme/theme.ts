import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#fafafa',
      contrastText: '#eceff1',
    },
    background: {
      default: '#fafafa',
      paper: '#fafafa',
    },
    text: {
      primary: '#212121',
      secondary: '#546e7a',
      disabled: '#cfd8dc',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
theme = responsiveFontSizes(theme);
export default theme;
