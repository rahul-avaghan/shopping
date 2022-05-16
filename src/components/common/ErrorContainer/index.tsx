import { ReactNode } from 'react';
import { Box } from '@mui/material';

type ErrorContainerProps = {
  children: ReactNode;
};

const ErrorContainer = ({ children }: ErrorContainerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 5,
        alignItems: 'center',
      }}>
      <Box sx={{ width: { lg: '300px', sm: '100%' } }}>{children}</Box>
    </Box>
  );
};

export default ErrorContainer;
