import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import eyeIcon from '@assets/images/eye.svg';
import { theme } from '@common/theme/theme';
import BalanceIcon from '@mui/icons-material/Balance';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
    viewed: Reminder;
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
    fontSize: needRow ? '1.5rem' : '1.75rem',
  };

  const { favorites, viewed, comparisons } = reminders;

  return (
    <ThemeProvider theme={theme}>
      <List
        disablePadding
        className={clsx(styles.list, { [styles.row]: needRow })}
      >
        <HashLink smooth to={`${favorites.linkTo}#liked`}>
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
        <HashLink smooth to={`${viewed.linkTo}#viewed`}>
          <ListItemButton>
            <Badge
              badgeContent={viewed.count > 10 ? '10+' : viewed.count}
              color="primary"
              invisible={viewed.count < 1}
            >
              <img
                className={styles.viewedIcon}
                src={eyeIcon}
                alt="history of viewed cars"
              />
            </Badge>
          </ListItemButton>
        </HashLink>
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
