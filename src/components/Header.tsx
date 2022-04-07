/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useWallet } from 'contexts';
import { getShortWalletAddress } from 'utils';
import { WalletType } from 'types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  flex: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    padding: '10px',
    fontWeight: 600,
  },
}));

export const Header = () => {
  const classes = useStyles();
  const { connected, account, connect } = useWallet();

  return (
    <Box className={clsx(classes.root, classes.flex)}>
      <Box className={classes.flex}>
        {connected ? (
          <Typography variant="h6">
            <b>{getShortWalletAddress(account || '')}</b>
          </Typography>
        ) : (
          <Button
            color="primary"
            variant="contained"
            style={{ height: 50 }}
            onClick={() => connect(WalletType.MetaMask)}
          >
            Connect Wallet
          </Button>
        )}
      </Box>
    </Box>
  );
};
