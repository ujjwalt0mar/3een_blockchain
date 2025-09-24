import React from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

const KYCStatus = ({ kycStatus, isLoading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Compliance Status</h2>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">Checking KYC status...</span>
        </div>
      ) : (
        <div className={`p-4 rounded-lg border-2 transition-colors duration-300 ${
          kycStatus 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center space-x-3">
            {kycStatus ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300 transition-colors duration-300">
                    ✅ KYC Approved (Oasis Hook)
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-400 transition-colors duration-300">
                    You are eligible for RWA token operations
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-300 transition-colors duration-300">
                    ❌ Compliance Verification Required
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400 transition-colors duration-300">
                    Complete KYC verification through Oasis to proceed with RWA operations
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <p className="text-sm text-blue-800 dark:text-blue-300 transition-colors duration-300">
          <strong>Powered by Oasis Protocol:</strong> Privacy-preserving compliance verification ensures regulatory requirements are met while protecting user data.
        </p>
      </div>
    </div>
  );
};

export default KYCStatus;
