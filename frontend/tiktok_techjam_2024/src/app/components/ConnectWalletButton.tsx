// components/ConnectWalletButton.tsx
import React, { useState } from 'react';
import { ethers } from 'ethers';

const ConnectWalletButton: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = (await signer).address;
        setAccount(address);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected as {account}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
