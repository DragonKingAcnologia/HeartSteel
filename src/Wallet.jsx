/*Luu Tan Phong - 104170839
  Pham Duc Thinh - 104169675
  Nguyen Tai Minh Huy - 104220352*/
import  { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers.js

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with the actual contract address
const contractABI = [/* Your contract's ABI here */]; // Replace with the actual ABI

function App() {
  const [account, setAccount] = useState('');
  const [nftCount, setNftCount] = useState(0);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  async function loadBlockchainData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Connect to your contract
      const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

      // Get the connected Ethereum account
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }

      // Example: Get the total NFT count
      const totalNftCount = await nftContract.totalSupply();
      setNftCount(totalNftCount.toNumber());
    } else {
      console.log('Web3 not detected. Please install MetaMask or another Web3 wallet.');
    }
  }

  return (
    <div className="App">
      <h1>Interact with NFT Contract</h1>
      <p>Connected Account: {account}</p>
      <p>Total NFTs: {nftCount}</p>
    </div>
  );
}

export default App;
