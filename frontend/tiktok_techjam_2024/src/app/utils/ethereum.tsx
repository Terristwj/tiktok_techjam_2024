import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Connect to MetaMask and get the signer
export const getSigner = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider.getSigner();
};

// Instantiate the RecommendationLogger contract
export const getRecommendationLoggerContract = (signer: ethers.Signer, contractAddress: string, contractABI: any) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};
