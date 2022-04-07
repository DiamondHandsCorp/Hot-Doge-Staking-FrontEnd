/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { PoolInfo, UserInfo } from 'types';
import { useStaking, useWallet } from 'contexts';
import { formatTime } from 'utils';

const useStyles = makeStyles(() => ({
  root: {
    width: 600,
    margin: '1rem',
    padding: '1rem',
    boxSizing: 'border-box',
    border: '1px solid black',
    borderRadius: 8,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    width: '100%',
    minHeight: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0.5rem',
  },
}));

interface IStakingPool {
  poolInfo: PoolInfo;
  pid: number;
}

export const StakingPool: React.FC<IStakingPool> = ({ poolInfo, pid }) => {
  const classes = useStyles();
  const {
    getUserInfo,
    rewards,
    deposit,
    withdrawAll,
    emergencyWithdraw,
    claim,
    fee,
  } = useStaking();
  const { getTokenBalance, account } = useWallet();

  const [userInfo, setUserInfo] = useState<Maybe<UserInfo>>(null);
  const [value, setValue] = useState('');
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const lockupTime =
    poolInfo.lockupDuration -
    (Math.abs(new Date().getTime() / 1000) - (userInfo?.lastAction || 0));

  const updateUserInfo = async () => {
    const res = await getUserInfo(pid);
    setUserInfo(res);
  };

  const updateTokenBalance = async () => {
    if (account) {
      const res = await getTokenBalance(account, poolInfo.stakeToken);
      console.log(res);
      setTokenBalance(res);
    } else {
      setTokenBalance(0);
    }
  };

  useEffect(() => {
    updateUserInfo();
    updateTokenBalance();
  }, [pid, poolInfo, account]);

  const handleDeposit = async () => {
    setLoading(true);
    const res = await deposit(pid, Number(value));
    if (res) {
      setValue('');
    }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    setLoading(true);
    const res = await withdrawAll(pid);
    if (res) {
      setValue('');
    }
    setLoading(false);
  };

  const handleEmergencyWithdraw = async () => {
    setLoading(true);
    const res = await emergencyWithdraw(pid);
    if (res) {
      setValue('');
    }
    setLoading(false);
  };

  const handleHarvest = async () => {
    setLoading(true);
    await claim(pid);
    setLoading(false);
  };

  const isValueCorrect = () => {
    return !isNaN(Number(value)) && Number(value) > 0;
  };

  const getFeeValue = () => {
    if (isNaN(Number(value))) {
      return 0;
    }
    return Number(value) * fee;
  };

  return (
    <Box className={clsx(classes.root, classes.flex)}>
      <Typography variant="h5">HOTDOGE Pool</Typography>
      <br />

      <Box className={classes.row}>
        <TextField
          variant="outlined"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          style={{ width: 300 }}
        />

        <Button
          color="primary"
          variant="contained"
          onClick={handleDeposit}
          disabled={
            loading || !isValueCorrect() || Number(value) > tokenBalance
          }
        >
          Deposit
        </Button>
      </Box>

      <Box className={classes.row}>
        <Typography>
          Fee Amount: <b>{getFeeValue().toLocaleString()} HOTDOGE</b>
        </Typography>
      </Box>

      <Box className={classes.row}>
        <Typography>
          Lockup Duration:{' '}
          <b>
            {poolInfo.lockupDuration > 0
              ? formatTime(poolInfo.lockupDuration)
              : 'None'}
          </b>
        </Typography>
      </Box>

      <Box className={classes.row}>
        <Typography>
          Availalbe to withdraw: <b>{formatTime(lockupTime)}</b>
        </Typography>
      </Box>

      <Box className={classes.row}>
        <Typography>
          Total Staked Amount:{' '}
          <b>{poolInfo.depositedAmount.toLocaleString() || 0} HOTDOGE</b>
        </Typography>
      </Box>

      <Box className={classes.row}>
        <Typography>
          User Staked Amount:{' '}
          <b>{userInfo?.amount.toLocaleString() || 0} HOTDOGE</b>
        </Typography>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleWithdraw}
            disabled={loading || (userInfo?.amount || 0) <= 0 || lockupTime > 0}
            style={{ marginBottom: 8 }}
          >
            Withdraw
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={handleEmergencyWithdraw}
            disabled={loading || (userInfo?.amount || 0) <= 0}
          >
            Emergency Withdraw
          </Button>
        </Box>
      </Box>

      <Box className={classes.row}>
        <Typography>
          User Reward Rate:{' '}
          <b>
            {poolInfo.depositedAmount > 0
              ? (
                  ((userInfo?.amount || 0) / poolInfo.depositedAmount) *
                  100
                ).toFixed(2)
              : Number(0).toFixed(2)}
            %
          </b>
        </Typography>
      </Box>

      <Box className={classes.row}>
        <Typography>
          User Balance: <b>{tokenBalance.toLocaleString() || 0} HOTDOGE</b>
        </Typography>
      </Box>

      <Box className={classes.row}>
        <Typography>
          Reward Amount: <b>{rewards[pid]?.toLocaleString() || 0} HOTDOGE</b>
        </Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={handleHarvest}
          disabled={loading || rewards[pid] <= 0}
        >
          Harvest
        </Button>
      </Box>
    </Box>
  );
};
