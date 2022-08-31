import React, { useState } from 'react';

import { DrawerItem } from '@components/header/drawer-item/drawer-item';
import {
  Reminders,
  RemindersProps,
} from '@components/header/reminders/reminders';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, IconButton, List } from '@mui/material';

import styles from './styles.module.scss';

interface DrawerComponentProps extends RemindersProps {
  userMenu?: {
    account: MenuItem;
    settings: MenuItem;
    logout: MenuItem;
  };
  commonMenu: {
    search: MenuItem;
    aboutUs: MenuItem;
  };
}

export interface MenuItem {
  label: string;
  onClick?: () => void;
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({
  userMenu,
  reminders,
  commonMenu,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={(): void => setOpenDrawer(false)}
      >
        <List className={styles.list}>
          <DrawerItem
            label={commonMenu.search.label}
            onClick={commonMenu.search.onClick}
          />
          <Divider />
          {reminders && <Reminders reminders={reminders} needRow={false} />}
          <Divider />
          {userMenu && (
            <DrawerItem
              label={userMenu.account.label}
              onClick={userMenu.account.onClick}
            />
          )}
          {userMenu && (
            <DrawerItem
              label={userMenu.settings.label}
              onClick={userMenu.settings.onClick}
            />
          )}
          <DrawerItem
            label={commonMenu.aboutUs.label}
            onClick={commonMenu.aboutUs.onClick}
          />
          {userMenu && (
            <DrawerItem
              label={userMenu.logout.label}
              onClick={userMenu.logout.onClick}
              className={styles.logout}
            />
          )}
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
