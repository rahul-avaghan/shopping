import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  testId: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, testId } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem data-testid={testId} button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default ListItemLink;
