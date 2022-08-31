import React from 'react';

import { MenuItem } from '@components/header/drawer/drawer';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface DrawerItemProps extends MenuItem {
  className?: string;
}

export const DrawerItem: React.FC<DrawerItemProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <ListItemButton onClick={onClick} className={className}>
      <ListItemIcon>
        <ListItemText
          sx={{
            color: 'black',
            fontWeight: 900,
            fontSize: '18px',
            textTransform: 'none',
          }}
        >
          {label}
        </ListItemText>
      </ListItemIcon>
    </ListItemButton>
  );
};
