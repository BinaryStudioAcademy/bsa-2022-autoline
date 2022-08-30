import React from 'react';
import { Link } from 'react-router-dom';

import DefaultAvatar from '@assets/images/header/default-avatar.png';
import { AppRoute } from '@common/enums/enums';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';

import { RemindersProps, Reminders } from '../reminders/reminders';
import styles from './private-elements.module.scss';

interface PrivateComponentProps extends RemindersProps {
  avatar: string | undefined | null;
  setOpenSettings: (state: boolean) => void;
}

export const PrivateElements: React.FC<PrivateComponentProps> = ({
  reminders,
  avatar,
  setOpenSettings,
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
      <Reminders reminders={reminders} />
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
          sx={{ width: 35, height: 35 }}
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
        <MenuItem onClick={handleClose} className={styles.userNavLink}>
          <Link to={AppRoute.PERSONAL}>Account</Link>
        </MenuItem>
        <MenuItem
          onClick={(): void => {
            handleClose();
            setOpenSettings(true);
          }}
        >
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.userNavLink}>
          <Link to={AppRoute.ADMINISTRATION}>Administration</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.userNavLink}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
