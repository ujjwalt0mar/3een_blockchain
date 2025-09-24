import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';

const WalletConnection = ({ 
  isConnected, 
  walletAddress, 
  networkStatus, 
  onConnect, 
  isConnecting 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Wallet Connection</h2>
        </div>
        {networkStatus && (
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${networkStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{networkStatus}</span>
          </div>
        )}
      </div>
      
      {!isConnected ? (
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 transition-colors duration-300">
            <span className="text-sm font-medium text-green-800 dark:text-green-300 transition-colors duration-300">Connected Address:</span>
            <span className="text-sm text-green-700 dark:text-green-400 font-mono transition-colors duration-300">{walletAddress}</span>
          </div>
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 transition-colors duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Wallet Connected Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;
