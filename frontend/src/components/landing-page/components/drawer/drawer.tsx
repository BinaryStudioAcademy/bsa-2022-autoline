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
export const DrawerComp = (): React.ReactElement => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={(): void => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto' }}
        onClick={(): void => setOpenDrawer(!openDrawer)}
      >
        {/* <MenuIcon color="white" /> */}
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};
