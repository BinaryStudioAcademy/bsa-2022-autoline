import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@common/enums/enums';
import { theme } from '@common/theme/theme';
import BalanceIcon from '@mui/icons-material/Balance';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge, Box, ThemeProvider } from '@mui/material';

import styles from './reminders.module.scss';

export interface RemindersProps {
  favorites: number;
  notifications: number;
  comparisons: number;
}

export const Reminders: React.FC<RemindersProps> = ({
  favorites,
  notifications,
  comparisons,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.reminder}>
        <Link to={AppRoute.PERSONAL}>
          <Badge badgeContent={favorites} color="primary">
            <FavoriteBorderIcon color="primary" />
          </Badge>
        </Link>
        <Badge badgeContent={notifications} color="primary">
          <NotificationsNoneIcon color="primary" />
        </Badge>
        <Badge badgeContent={comparisons} color="primary">
          <BalanceIcon color="primary" />
        </Badge>
      </Box>
    </ThemeProvider>
  );
};
