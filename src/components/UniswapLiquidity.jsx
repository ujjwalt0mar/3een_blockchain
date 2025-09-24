import React from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';

const UniswapLiquidity = ({ 
  priceQuote, 
  isLoadingQuote, 
  onRefreshQuote, 
  lastUpdated 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-6 w-6 text-pink-600 dark:text-pink-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Uniswap Liquidity</h2>
        </div>
        <button
          onClick={onRefreshQuote}
          disabled={isLoadingQuote}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors duration-200"
        >
          <RefreshCw className={`h-5 w-5 ${isLoadingQuote ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border border-pink-200 dark:border-pink-800 transition-colors duration-300">
          {isLoadingQuote ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600 dark:border-pink-400"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">Fetching live quote...</span>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Current Exchange Rate
              </p>
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400 transition-colors duration-300">
                1 RAT = {priceQuote} USDC
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
                via Uniswap V3
              </p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-300">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 transition-colors duration-300">Pool TVL</h4>
            <p className="text-blue-700 dark:text-blue-400 transition-colors duration-300">$2.4M USDC</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 transition-colors duration-300">
            <h4 className="font-semibold text-green-900 dark:text-green-300 mb-1 transition-colors duration-300">24h Volume</h4>
            <p className="text-green-700 dark:text-green-400 transition-colors duration-300">$156K</p>
          </div>
        </div>
        
        {lastUpdated && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center transition-colors duration-300">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </div>
  );
};

export default UniswapLiquidity;
