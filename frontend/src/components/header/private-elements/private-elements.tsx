import React from 'react';

import DefaultAvatar from '@assets/images/header/default-avatar.png';
import { UserMenu } from '@components/header/menu-interfaces/menu-interfaces';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';

import { RemindersProps, Reminders } from '../reminders/reminders';
import styles from './private-elements.module.scss';

interface PrivateComponentProps extends RemindersProps {
  avatar: string | undefined | null;
  role: string;
  setOpenSettings: (state: boolean) => void;
  userMenu: UserMenu;
}

export const PrivateElements: React.FC<PrivateComponentProps> = ({
  reminders,
  avatar,
  role,
  userMenu,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isAvatarImageLoaded, setAvatarImageLoaded] = React.useState(false);
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
          onLoad={(): void => setAvatarImageLoaded(true)}
          alt="avatar"
          sx={{
            width: 35,
            height: 35,
            visibility: isAvatarImageLoaded ? 'visible' : 'hidden',
          }}
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
        <MenuItem
          onClick={(): void => {
            handleClose();
            userMenu.account.onClick();
          }}
          className={styles.userNavLink}
        >
          {userMenu.account.label}
        </MenuItem>
        <MenuItem
          onClick={(): void => {
            handleClose();
            userMenu.settings.onClick();
          }}
        >
          {userMenu.settings.label}
        </MenuItem>
        {role === 'admin' && (
          <MenuItem
            onClick={(): void => {
              handleClose();
              userMenu.administration.onClick();
            }}
          >
            {userMenu.administration.label}
          </MenuItem>
        )}
        <MenuItem
          onClick={(): void => {
            handleClose();
            userMenu.logout.onClick();
          }}
        >
          {userMenu.logout.label}
        </MenuItem>
      </Menu>
    </div>
  );
};
