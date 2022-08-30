import React from 'react';
import { Link } from 'react-router-dom';

import { theme } from '@common/theme/theme';
import BalanceIcon from '@mui/icons-material/Balance';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge, List, ListItemButton, ThemeProvider } from '@mui/material';
import { clsx } from 'clsx';

import styles from './reminders.module.scss';

interface Reminder {
  label: string;
  linkTo: string;
  count: number;
}

export interface RemindersProps {
  reminders?: {
    favorites: Reminder;
    notifications: Reminder;
    comparisons: Reminder;
  };
  needRow?: boolean;
}

export const Reminders: React.FC<RemindersProps> = ({
  reminders,
  needRow = true,
}) => {
  if (!reminders) {
    return null;
  }

  const { favorites, notifications, comparisons } = reminders;

  return (
    <ThemeProvider theme={theme}>
      <List disablePadding className={clsx({ [styles.row]: needRow })}>
        <Link to={favorites.linkTo}>
          <ListItemButton className={styles.link}>
            <Badge
              badgeContent={favorites.count}
              color="primary"
              invisible={favorites.count < 1}
            >
              <FavoriteBorderIcon color="primary" />
            </Badge>
          </ListItemButton>
        </Link>
        <Link to={notifications.linkTo}>
          <ListItemButton>
            <Badge
              badgeContent={notifications.count}
              color="primary"
              invisible={notifications.count < 1}
            >
              <NotificationsNoneIcon color="primary" />
            </Badge>
          </ListItemButton>
        </Link>
        <Link to={comparisons.linkTo}>
          <ListItemButton>
            <Badge
              badgeContent={comparisons.count}
              color="primary"
              invisible={comparisons.count < 1}
            >
              <BalanceIcon color="primary" />
            </Badge>
          </ListItemButton>
        </Link>
      </List>
      {/*<Box*/}
      {/*  className={clsx(styles.reminder, {*/}
      {/*    [styles.row]: needRow,*/}
      {/*  })}*/}
      {/*>*/}
      {/*  <Link to={favorites.linkTo} className={styles.link}>*/}
      {/*    <Badge*/}
      {/*      badgeContent={favorites.count}*/}
      {/*      color="primary"*/}
      {/*      invisible={favorites.count < 1}*/}
      {/*    >*/}
      {/*      <FavoriteBorderIcon color="primary" />*/}
      {/*    </Badge>*/}
      {/*  </Link>*/}
      {/*  <Link to={notifications.linkTo} className={styles.link}>*/}
      {/*    <Badge*/}
      {/*      badgeContent={notifications.count}*/}
      {/*      color="primary"*/}
      {/*      invisible={notifications.count < 1}*/}
      {/*    >*/}
      {/*      <NotificationsNoneIcon color="primary" />*/}
      {/*    </Badge>*/}
      {/*  </Link>*/}
      {/*  <Link to={comparisons.linkTo} className={styles.link}>*/}
      {/*    <Badge*/}
      {/*      badgeContent={comparisons.count}*/}
      {/*      color="primary"*/}
      {/*      invisible={comparisons.count < 1}*/}
      {/*    >*/}
      {/*      <BalanceIcon color="primary" />*/}
      {/*    </Badge>*/}
      {/*  </Link>*/}
      {/*</Box>*/}
    </ThemeProvider>
  );
};
