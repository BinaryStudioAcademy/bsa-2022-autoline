import React from 'react';

import DefaultAvatar from '@assets/images/header/default-avatar.png';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';

import { RemindersProps, Reminders } from '../reminders/reminders';
import styles from './private-elements.module.scss';

interface PrivateComponentProps extends RemindersProps {
  avatar: string | undefined | null;
}

export const PrivateElements: React.FC<PrivateComponentProps> = ({
  favorites,
  notifications,
  comparisons,
  avatar,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.information}>
      <Reminders
        favorites={favorites}
        comparisons={comparisons}
        notifications={notifications}
      />
      <IconButton
        id="basic-button"
        className={styles.avatarCover}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar
          className={styles.avatar}
          src={avatar || DefaultAvatar}
          alt="avatar"
          sx={{ width: 35, height: 35, ml: 2 }}
        />
        {open ? (
          <ArrowDropUpIcon color="primary" />
        ) : (
          <ArrowDropDownIcon color="primary" />
        )}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};