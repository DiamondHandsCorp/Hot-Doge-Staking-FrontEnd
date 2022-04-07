import tokenAbi from '../abi/Token.json';
import stakingAbi from '../abi/Staking.json';

const config = {
  tokenAbi,
  tokenAddress: '0x7b01b8D1f90CeA54d24D0B385C7FC377fB0573d9',
  stakingAbi,
  stakingAddress: '0x4B1F5768378d4d086f90dB781B02bb10AeAb95fB',
  providerUrl: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  networkId: 4,
  networkName: 'Rinkeby Testnet',
};

export default config;
