import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ToastContainer } from 'react-toastify';
import { ContractProvider, WalletProvider } from 'contexts';
import { Home } from 'pages';
import { Header } from 'components';

import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    fontFamily: 'Poppins',
  },
}));

function App() {
  const classes = useStyles();

  const getLibrary = (provider: any) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContractProvider>
        <WalletProvider>
          <main className={classes.root}>
            <Header />
            <Home />
            <ToastContainer />
          </main>
        </WalletProvider>
      </ContractProvider>
    </Web3ReactProvider>
  );
}

export default App;
