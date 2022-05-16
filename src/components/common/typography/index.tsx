import { Typography } from '@mui/material';
import { ComponentProps } from 'react';

type TextProp = ComponentProps<typeof Typography>;

const primaryColor = { color: 'text.primary' };
const secondaryColor = { color: 'text.secondary' };
const primaryColorProps = {
  sx: { ...primaryColor },
  component: 'div',
};

const secondaryColorProps = {
  sx: { ...secondaryColor },
  component: 'div',
};

const H6 = (props: TextProp) => {
  const allProps = { ...primaryColorProps, ...props };
  return (
    <Typography variant="h6" {...allProps}>
      {props.children}
    </Typography>
  );
};

const H5 = (props: TextProp) => {
  const allProps = { ...primaryColorProps, ...props };

  return (
    <Typography variant="h5" {...allProps}>
      {props.children}
    </Typography>
  );
};

const SubTitle1 = (props: TextProp) => {
  const allProps = { ...secondaryColorProps, ...props };

  return (
    <Typography variant="subtitle1" {...allProps}>
      {props.children}
    </Typography>
  );
};

const Body2 = (props: TextProp) => {
  const allProps = { ...secondaryColorProps, ...props };

  return (
    <Typography variant="body2" {...allProps}>
      {props.children}
    </Typography>
  );
};

export { H5, H6, Body2, SubTitle1 };
