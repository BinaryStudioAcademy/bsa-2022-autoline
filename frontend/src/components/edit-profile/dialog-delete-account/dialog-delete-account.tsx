import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DialogDeleteAccountProps {
  isOpen: boolean;
  handleCloseDialog: () => void;
  handleDeleteProfile: () => Promise<void>;
}

export const DialogDeleteAccount: React.FC<DialogDeleteAccountProps> = ({
  isOpen,
  handleDeleteProfile,
  handleCloseDialog,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure you want to delete your account?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The account cannot be restored after deletion
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDeleteProfile}>Delete Profile</Button>
      </DialogActions>
    </Dialog>
  );
};
