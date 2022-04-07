import { Contract } from 'web3-eth-contract';

export interface IContract {
  contract: Contract;
  address: string;
}

export enum WalletType {
  MetaMask = 'metamask',
  WalletConnect = 'walletconnect',
}

export interface PoolInfo {
  stakeToken: string;
  rewardToken: string;
  rewardPerBlock: number;
  lockupDuration: number;
  depositedAmount: number;
  lpPool: boolean;
}

export interface UserInfo {
  amount: number;
  rewardDebt: number;
  pendingRewards: number;
  lastAction: number;
}
