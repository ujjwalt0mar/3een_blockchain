import React from 'react';
import { Coins, Lock, AlertTriangle } from 'lucide-react';

const TokenIssuance = ({ kycStatus, onMintToken, isMinting, riskScore }) => {
  const showRiskWarning = riskScore && riskScore.score > 70;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Coins className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">RWA Token Issuance</h2>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Real World Asset Token (RAT)</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 transition-colors duration-300">
            <li>• Backed by verified real-world assets</li>
            <li>• AI-enhanced compliance verification</li>
            <li>• Tradeable on Uniswap V3</li>
            <li>• Real-time risk monitoring</li>
          </ul>
        </div>

        {showRiskWarning && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 transition-colors duration-300">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-800 dark:text-red-300 transition-colors duration-300">
                High Risk Wallet Detected
              </span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1 transition-colors duration-300">
              AI analysis shows elevated risk score ({riskScore.score}/100). Enhanced monitoring will be applied.
            </p>
          </div>
        )}
        
        <button
          onClick={onMintToken}
          disabled={!kycStatus || isMinting}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform ${
            kycStatus && !isMinting
              ? showRiskWarning
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isMinting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Minting RAT Token...</span>
            </div>
          ) : kycStatus ? (
            showRiskWarning ? 'Mint with Risk Monitoring' : 'Mint RWA Token'
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>KYC Required to Mint</span>
            </div>
          )}
        </button>
        
        {!kycStatus && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center transition-colors duration-300">
            Complete KYC verification to enable token minting
          </p>
        )}
      </div>
    </div>
  );
};

export default TokenIssuance;
