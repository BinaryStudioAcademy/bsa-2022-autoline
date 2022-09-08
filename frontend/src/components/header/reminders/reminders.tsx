import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

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

  const iconsSx = {
    fontSize: needRow ? 20 : 24,
  };

  const { favorites, notifications, comparisons } = reminders;

  return (
    <ThemeProvider theme={theme}>
      <List
        disablePadding
        className={clsx(styles.list, { [styles.row]: needRow })}
      >
        <HashLink to={`${favorites.linkTo}#liked`}>
          <ListItemButton>
            <Badge
              badgeContent={favorites.count}
              color="primary"
              invisible={favorites.count < 1}
            >
              <FavoriteBorderIcon color="primary" sx={iconsSx} />
            </Badge>
          </ListItemButton>
        </HashLink>
        <Link to={notifications.linkTo}>
          <ListItemButton>
            <Badge
              badgeContent={notifications.count}
              color="primary"
              invisible={notifications.count < 1}
            >
              <NotificationsNoneIcon color="primary" sx={iconsSx} />
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
              <BalanceIcon color="primary" sx={iconsSx} />
            </Badge>
          </ListItemButton>
        </Link>
      </List>
    </ThemeProvider>
  );
};
