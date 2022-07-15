import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


import {QRCodeSVG} from 'qrcode.react';


const emails = ['username@gmail.com', 'user02@gmail.com'];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    minWidth: 300,
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 10,
          top: 10,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
    ) : null}

      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

export function BoostpowQrCodeDialog(props) {
  var { onClose, open, tx_id, value, currency } = props;

  if (!currency) {
    currency = 'USD'
  }
  if (!value) {
    value = 0.05
  }

  const handleClose = (event) => {
    event.preventDefault();

    console.log('__HANDLE', event)
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    minWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    textAlign: 'center',
    '& .MuDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuDialogActions-root': {
      padding: theme.spacing(1)
    }
  }));

  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>

      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Scan to Boost
      </BootstrapDialogTitle>

      <DialogContent dividers>
        <QRCodeSVG value={`pay:?r=https://askbitcoin.ai/api/v1/boostpow/${tx_id}/new?value=${value}&currency=${currency}`} />,

        </DialogContent>

    </BootstrapDialog>
  );
}

BoostpowQrCodeDialog.propTypes = {
  tx_id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ tx_id }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Scan with Wallet
      </Button>
      <BoostpowQrCodeDialog
        open={open}
        tx_id={tx_id}
        onClose={handleClose}
      />
    </div>
  );
}
