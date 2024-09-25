// lib/drizzleConfig.ts

import MyContract from '../artifacts/MyContract.json'; // Import your contract's ABI
import { DrizzleOptions } from '@drizzle/store';

// Define the Drizzle options
const drizzleOptions: DrizzleOptions = {
  contracts: [
    {
      // Contract name
      contractName: 'MyContract',
      // Contract ABI
      web3Contract: new window.web3.eth.Contract(MyContract.abi, '0xYourContractAddress'), // Replace with your contract address
    },
  ],
  web3: {
    // Web3 provider settings
    fallback: {
      type: 'ws', // Use 'http' for HTTP or 'ws' for WebSocket connections
      url: 'ws://localhost:7545', // Change this to your provider URL (e.g., Ganache, Infura, Alchemy)
    },
  },
  events: {
    MyContract: ['YourEvent'], // Replace with your contract events if needed
  },
};

// Export the drizzle options
export default drizzleOptions;
