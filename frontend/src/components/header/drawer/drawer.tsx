import React, { useState } from 'react';

import {
  Reminders,
  RemindersProps,
} from '@components/header/reminders/reminders';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface DrawerComponentProps extends RemindersProps {
  userMenu?: Array<MenuItem>;
}

interface MenuItem {
  label: string;
  onClick?: () => void;
}

const pages = ['Used Cars', 'New Cars', 'About Us'];

export const DrawerComponent: React.FC<DrawerComponentProps> = ({
  userMenu,
  reminders,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={(): void => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText
                  sx={{
                    color: 'black',
                    fontWeight: 900,
                    fontSize: '18px',
                    textTransform: 'none',
                  }}
                >
                  {page}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          <Divider />
          {reminders && <Reminders reminders={reminders} needRow={false} />}
          <Divider />
          {userMenu &&
            userMenu.map((menuItem, index) => (
              <ListItemButton key={index} onClick={menuItem.onClick}>
                <ListItemIcon>
                  <ListItemText
                    sx={{
                      color: 'black',
                      fontWeight: 900,
                      fontSize: '18px',
                      textTransform: 'none',
                    }}
                  >
                    {menuItem.label}
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: 'blue', marginLeft: 'auto' }}
        onClick={(): void => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon sx={{ color: 'blue' }} />
      </IconButton>
    </>
  );
};
