import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const pages = ['Used Cars', 'New Cars', 'Sell Your Car', 'About Us'];

export const DrawerComponent = (): React.ReactElement => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="left"
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
